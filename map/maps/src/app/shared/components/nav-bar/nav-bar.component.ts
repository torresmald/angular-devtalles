import { Component, inject } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { routes } from '../../../app.routes';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  public router = inject(Router);

  public routes = routes
    .filter((route) => route.path !== '**')
    .map((route) => ({
      title: route.title ?? 'Maps Angular',
      path: route.path,
    }));

  public pageTitle = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(
        (event) =>
          this.routes.find((route) => `/${route.path}` === event.url)?.title
      )
    )
  );
}

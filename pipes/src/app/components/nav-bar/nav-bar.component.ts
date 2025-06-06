import { Component } from '@angular/core';
import { routes } from '../../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styles: ``,
})
export class NavBarComponent {

  public routes = routes.map(route => ({
    path: route.path,
    title: route.title
  }))

 }

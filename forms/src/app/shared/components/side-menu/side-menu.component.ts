import { Component } from '@angular/core';
import reactiveRoutes from '../../../reactive/reactive.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface SideMenu {
  route: string;
  title: string;
}

const reactiveItems = reactiveRoutes[0].children ?? [];

@Component({
  selector: 'app-side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  public reactiveMenu: SideMenu[] = reactiveItems
    .filter(
      (item) =>
        item.path !== '**' &&
        typeof item.title === 'string' &&
        typeof item.path === 'string'
    )
    .map((item) => ({
      title: item.title as string,
      route: `reactive/${item.path}` as string,
    }));

  public authMenu: SideMenu[] = [
    {
      title: 'auth',
      route: `/auth`,
    },
  ];

  public countryMenu: SideMenu[] = [
    {
      title: 'country',
      route: `/country`,
    },
  ];
}

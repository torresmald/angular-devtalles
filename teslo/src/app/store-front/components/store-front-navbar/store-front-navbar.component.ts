import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Routes } from '../../interfaces/routes.interface';
import { AuthService } from '@/auth/services/auth.service';

@Component({
  selector: 'store-front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './store-front-navbar.component.html',
})
export class StoreFrontNavbarComponent {
  public routes = signal<Routes[]>([
    {
      title: 'Men',
      path: 'gender/men',
    },
    {
      title: 'Women',
      path: 'gender/women',
    },
    {
      title: 'Kids',
      path: 'gender/kids',
    },
  ]);

  public authService = inject(AuthService);

}

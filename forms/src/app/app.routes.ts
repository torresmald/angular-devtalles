import { Routes } from '@angular/router';
import authRoutes from './auth/auth.routes';
import countryRoutes from './country/country.routes';
import reactiveRoutes from './reactive/reactive.routes';
export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: 'reactive',
    loadChildren: () => import('./reactive/reactive.routes'),
  },
  {
    path: '**',
    redirectTo: 'reactive'
  }
];

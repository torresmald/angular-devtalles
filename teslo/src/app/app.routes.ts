import { Routes } from '@angular/router';
import allowEnterAuth from './auth/guards/allowEnterAuth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.route'),
    canMatch: [allowEnterAuth],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin-dashboard.routes')
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes'),
  },
];

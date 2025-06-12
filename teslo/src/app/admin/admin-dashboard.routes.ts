import { Routes } from '@angular/router';
import { AdminDashboardLayoutComponent } from './layouts/admin-dashboard/admin-dashboard-layout.component';
import isAdminUser from './guards/isAdminUser.guard';
import { ProductsAdminPageComponent } from './pages/products-admin-page/products-admin-page.component';
import { ProductAdminPageComponent } from './pages/product-admin-page/product-admin-page.component';

export const adminDashboardRoutes: Routes = [
  {
    path: '',
    component: AdminDashboardLayoutComponent,
    children: [
      {
        path: 'products',
        component: ProductsAdminPageComponent,
        canActivate: [isAdminUser],
      },
      {
        path: 'product/:id',
        component: ProductAdminPageComponent,
        canActivate: [isAdminUser],
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default adminDashboardRoutes;

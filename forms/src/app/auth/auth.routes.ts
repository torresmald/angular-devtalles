import { Routes } from "@angular/router";

export const authRoutes:Routes = [
  {
    path: '',
    children: [
      {
        path: 'register',
        loadComponent: () => import('./pages/register-page/register-page.component')
      },
      {
        path: '**',
        redirectTo: 'register'
      }
    ]
  }
]


export default authRoutes

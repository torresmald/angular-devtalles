import { Routes } from '@angular/router';

export const reactiveRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        title: 'Basic',
        loadComponent: () => import('./pages/basic-page/basic-page.component'),
      },
      {
        path: 'dynamic',
        title: 'Dynamic',

        loadComponent: () => import('./pages/dynamic-page/dynamic-page.component'),
      },
      {
        path: 'switches',
        title: 'Switches',
        loadComponent: () => import('./pages/switches-page/switches-page.component'),
      },
      {
        path: '**',
        title: '404',
        redirectTo: 'basic'
      }
    ],
  },
];


export default reactiveRoutes

import { Routes } from '@angular/router';
import { CountryPageComponent } from './layouts/country-page/country-page.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryPageComponent,
    children: [
      {
        path: 'by-capital',
        loadComponent: () =>
          import('./pages/country-by-capital/country-by-capital.component'),
      },
      {
        path: 'by-region',
        loadComponent: () =>
          import('./pages/country-by-region/country-by-region.component'),
      },
      {
        path: 'by-country',
        loadComponent: () =>
          import('./pages/country-by-country/country-by-country.component'),
      },
      {
        path:'by/:code',
        loadComponent: () => import('./pages/country-by-id/country-by-id.component')
      },
      {
        path: '**',
        redirectTo: 'by-capital',
      },
    ],
  },
];

export default countryRoutes;

import { Component, inject, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { of } from 'rxjs';
import CountryService from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { Endpoints } from '../../interfaces/ednpoints.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-by-country',
  imports: [CountryListComponent, CountrySearchComponent],
  templateUrl: './country-by-country.component.html',
  styleUrl: './country-by-country.component.css',
})
export default class CountryByCountryComponent {
  public query = signal('');
  public countryService = inject(CountryService);
  private router = inject(Router);

  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-country'], {
        queryParams: {
          query: request.query,
        },
      });
      return this.countryService.searchBy(request.query, Endpoints.name);
    },
  });
}

import { Component, computed, inject, input } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import CountryService from '../../services/country.service';
import { NotFoundComponent } from '../../components/not-found/not-found.component';
import { CountryDetailsComponent } from './country-details/country-details.component';

@Component({
  selector: 'app-country-by-id',
  imports: [NotFoundComponent, CountryDetailsComponent],
  templateUrl: './country-by-id.component.html',
  styleUrl: './country-by-id.component.css',
})
export default class CountryByIdComponent {
  public code = input('');
  public countryService = inject(CountryService);

  public countryResource = rxResource({
    request: () => ({ code: this.code() }),
    loader: ({ request }) => {
      if (!request.code) return of([]);
      return this.countryService.searchBy(request.code, 'alpha');
    },
  });

  public country = computed(() => this.countryResource.value()![0]);
}

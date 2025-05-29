import { Component, inject, resource, signal } from '@angular/core';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import CountryService from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { Endpoints } from '../../interfaces/ednpoints.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-country-by-capital',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './country-by-capital.component.html',
  styleUrl: './country-by-capital.component.css',
})
export default class CountryByCapitalComponent {
  public countryService = inject(CountryService);
  private router = inject(Router);
  // public isLoading = signal(false)
  // public hasError = signal<null | string>(null)
  // public countries = signal<Country[]>([])

  public query = signal('');

  public countryResource = rxResource({
    request: () => ({ query: this.query() }),
    loader: ({ request }) => {
      if (!request.query) return of([]);
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: request.query,
        },
      });
      return this.countryService.searchBy(request.query, Endpoints.capital);
    },
  });

  // public onSearchCountry(query: string) {
  //   if(query === '' || this.isLoading()) return
  //   this.isLoading.set(true)
  //   this.hasError.set(null)
  //   this.countryService.searchByCapital(query).subscribe({
  //     next: (countries) => {
  //       this.isLoading.set(false)
  //       this.countries.set(countries)
  //     },
  //     error: (error) => {
  //       console.log(error);

  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.hasError.set(error)
  //     }
  //   });
  // }
}

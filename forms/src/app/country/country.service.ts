import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Country } from './interfaces/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private url = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._regions];
  }

  public getCountriesByRegion(region: string): Observable<Country[]> {
    if (!region) return of([]);
    const url = `${this.url}/region/${region}?fields=cca3,name,borders`;
    return this.http.get<Country[]>(url);
  }
  getCountryByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.url}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getBordersByAlpaCode(borders: string[]): Observable<Country[]> {
    if (!borders || borders.length === 0) return of([]);

    const countryRequest: Observable<Country>[] = [];

    borders.forEach((border) => {
      const request = this.getCountryByAlphaCode(border);
      countryRequest.push(request);
    });

    return combineLatest(countryRequest);
  }
}

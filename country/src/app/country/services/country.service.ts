import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountryResponse } from '../interfaces/country-response.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { mapperCountries } from '../helpers/country.mapper';
import { Country } from '../interfaces/country.interface';
import { Endpoints } from '../interfaces/ednpoints.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export default class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountries = new Map<string, Country[]>();
  private queryCacheRegions = new Map<string, Country[]>();

  public searchBy(query: string, path: string): Observable<Country[]> {
    const queryLowerCase = query.toLowerCase();
    let cacheResults = this.returnQueryCache(query, path);
    if (cacheResults) {
      return cacheResults;
    }
    return this.http
      .get<CountryResponse[]>(`${API_URL}/${path}/${queryLowerCase}`)
      .pipe(
        map((countries: CountryResponse[]): Country[] =>
          mapperCountries(countries)
        ),
        tap((countries) => this.setQueryCache(query, countries, path)),
        catchError((error) => {
          console.log(error);

          return throwError(() => new Error('Failed to fetch Countries'));
        })
      );
  }

  private returnQueryCache(
    query: string,
    path: string
  ): Observable<Country[]> | null {
    switch (path) {
      case Endpoints.capital:
        if (this.queryCacheCapital.has(query)) {
          return of(this.queryCacheCapital.get(query) ?? []);
        }
        return null;
      case Endpoints.name:
        if (this.queryCacheCountries.has(query)) {
          return of(this.queryCacheCountries.get(query) ?? []);
        }
        return null;
      case Endpoints.region:
        if (this.queryCacheRegions.has(query)) {
          return of(this.queryCacheRegions.get(query) ?? []);
        }
        return null;
      default:
        return null;
    }
  }

  private setQueryCache(query: string, countries: Country[], path: string) {
    switch (path) {
      case Endpoints.capital:
        this.queryCacheCapital.set(query, countries);
        return;
      case Endpoints.name:
        this.queryCacheCountries.set(query, countries);
        return;
      case Endpoints.region:
        this.queryCacheRegions.set(query, countries);
        return;
      default:
        return;
    }
  }
}

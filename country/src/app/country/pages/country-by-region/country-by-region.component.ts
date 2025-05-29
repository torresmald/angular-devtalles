import { Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import type { Region } from '../../interfaces/region.interface';
import  { Endpoints } from '../../interfaces/ednpoints.interface';
import CountryService from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-country-by-region',
  imports: [CountryListComponent],
  templateUrl: './country-by-region.component.html',
  styleUrl: './country-by-region.component.css'
})
export default class CountryByRegionComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];
  public countryService = inject(CountryService)
  public regionSearch = signal('')

    public countryResource = rxResource({
    request: () => ({region: this.regionSearch()}),
    loader:  ({request}) => {
      if(!request.region) return of([])
      return  this.countryService.searchBy(request.region, Endpoints.region)
    }
  })
}

import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  imports: [RouterLink, DecimalPipe],
  templateUrl: './country-list.component.html',
  styleUrl: './country-list.component.css'
})
export class CountryListComponent {

  public countries = input.required<Country[]>()
  public errorMessage = input<string|unknown>()
  public isLoading = input(false)
  public isEmpty = input(false)
}

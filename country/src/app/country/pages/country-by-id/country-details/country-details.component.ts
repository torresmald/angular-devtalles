import {  Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-details',
  imports: [DecimalPipe],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css',
})
export class CountryDetailsComponent {

  public country = input.required<Country>()

  public currentYear = computed(() => new Date().getFullYear())
 }

import { Component, effect, inject, signal } from '@angular/core';
import { CountryService } from '../../country.service';
import { Country, Name } from '../../interfaces/country.interface';
import { filter, map, switchMap, tap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.component.html',
})
export default class CountryPageComponent {
  private fb = inject(FormBuilder);
  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });
  public countyService = inject(CountryService);
  public countriesByRegion = signal<Country[]>([]);
  public borders = signal<Country[]>([]);

  public onFormChanged = effect((onCleanUp) => {
    const regionChanged = this.onRegionChanged();
    const countryChanged = this.onCountryChanged();

    onCleanUp(() => {
      regionChanged.unsubscribe();
      countryChanged.unsubscribe();
    });
  });

  public onRegionChanged() {
    return this.myForm
      .get('region')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('country')?.setValue('');
          this.myForm.get('border')?.setValue('');
        }),
        switchMap((region) => this.countyService.getCountriesByRegion(region))
      )
      .subscribe((countries: Country[]) =>
        this.countriesByRegion.set(countries)
      );
  }

  public onCountryChanged() {
    return this.myForm
      .get('country')!
      .valueChanges.pipe(
        tap(() => {
          this.myForm.get('border')?.setValue('');
        }),
        filter((value) => value.length > 0),
        switchMap((code: string) =>
          this.countyService.getCountryByAlphaCode(code)
        ),
        switchMap((country: Country) => {
          return this.countyService.getBordersByAlpaCode(country.borders)
        })
      )
      .subscribe((countriesBorders: Country[]) => this.borders.set(countriesBorders));
  }
}

import {
  Component,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country-search',
  imports: [],
  templateUrl: './country-search.component.html',
  styleUrl: './country-search.component.css',
})
export class CountrySearchComponent {
  public emittedCountry = output<string>();
  public placeholder = input.required<string>();
  public activatedRoute =
    inject(ActivatedRoute).snapshot.queryParams['query'] ?? '';
  public valueRoute = signal(this.activatedRoute);
  public value = signal(this.valueRoute());

  public debounceEffect = effect((onCleanup) => {
    const value = this.value();
    const timeout = setTimeout(() => {
      this.emittedCountry.emit(value);
    }, 500);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}

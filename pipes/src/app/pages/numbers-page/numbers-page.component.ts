import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-numbers-page',
  imports: [DecimalPipe, CurrencyPipe, PercentPipe],
  templateUrl: './numbers-page.component.html',
  styles: ``,
})
export default class NumbersPageComponent {

  public decimaNumber = signal(23423423.324234)
  public pecentage = signal(0.49807)
  public currency = signal(3500)
 }

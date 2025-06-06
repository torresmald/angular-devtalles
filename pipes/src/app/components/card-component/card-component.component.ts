import { Component, input } from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card-component.component.html',
  styles: ``,
})
export class CardComponentComponent {
  public title = input('')
 }

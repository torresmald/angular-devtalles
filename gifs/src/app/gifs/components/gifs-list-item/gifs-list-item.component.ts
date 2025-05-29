import { Component, input } from '@angular/core';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gifs-list-item',
  imports: [],
  templateUrl: './gifs-list-item.component.html',
})
export class GifsListItemComponent {

  public gif = input.required<Gif>();
}

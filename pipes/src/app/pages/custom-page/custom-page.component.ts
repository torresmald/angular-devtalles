import { Component, signal } from '@angular/core';
import { TransformCasePipe } from '../../pipes/transform-case.pipe';
import { heroes } from '../../interfaces/heroes.data';
import { Color, ColorMap, Hero } from '../../interfaces/hero.interface';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { ColorPipe } from '../../pipes/color.pipe';
import { ColorTextPipe } from '../../pipes/color-text.pipe';
import { CreatorPipe } from '../../pipes/creator.pipe';
import { SortByPipe } from '../../pipes/sort-by.pipe';
import { FilterByPipe } from '../../pipes/filter-by.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [
    TransformCasePipe,
    CanFlyPipe,
    ColorPipe,
    ColorTextPipe,
    CreatorPipe,
    SortByPipe,
    FilterByPipe
  ],
  templateUrl: './custom-page.component.html',
  styles: ``,
})
export default class CustomPageComponent {
  public name = signal('Jonathan');
  public type = signal<'lowercase' | 'uppercase'>('lowercase');

  public changeType() {
    this.type() === 'lowercase'
      ? this.type.set('uppercase')
      : this.type.set('lowercase');
  }

  public heroes = signal<Hero[]>(heroes);
  public condition = signal<keyof Hero>('id');
  public searchQuery = signal<string>('');

  public sortBy(condition: keyof Hero) {
    this.condition.set(condition);
  }
}

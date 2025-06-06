import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  transform(value: Hero[], search: string): Hero[] {
    if (!search) return value;
    search = search.toLowerCase();
    return value.filter((hero) => hero.name.toLowerCase().includes(search));
  }
}

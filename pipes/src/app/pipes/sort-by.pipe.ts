import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: Hero[], ...args: unknown[]): Hero[] {
    const condition:keyof Hero = args[0] as keyof Hero

    const sortedHeroes = value.sort((a, b) => {
      if(a[condition] >= b[condition]) return 1
      return -1
    })
    return sortedHeroes
  }
}

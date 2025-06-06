import { Pipe, PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'creator'
})
export class CreatorPipe implements PipeTransform {

  transform(value: Creator): string {
    return value ? 'Marvel' : 'DC'
  }

}

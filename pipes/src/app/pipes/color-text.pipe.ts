import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'colorText'
})
export class ColorTextPipe implements PipeTransform {

  transform(value: Color): string {
    const mapper = ColorMap
    return mapper[value]
  }
}

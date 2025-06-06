import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformCase'
})
export class TransformCasePipe implements PipeTransform {

  transform(value: string, type: 'uppercase' | 'lowercase' = 'lowercase'): string {
    return type ==='lowercase' ?
     value.toLowerCase()
    : value.toUpperCase()
  }

}

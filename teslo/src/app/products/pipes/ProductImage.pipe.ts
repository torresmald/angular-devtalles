import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string | string[] {
    if (typeof value === 'string' && value.startsWith('blob:')) {
      return value;
    }

    if (typeof value === 'string') {
      return `${environment.API_URL}/files/product/${value}`;
    }

    const image = value.at(0);

    if (!image) {
      return './assets/no-image.jpg';
    }

    return `${environment.API_URL}/files/product/${image}`;
  }
}

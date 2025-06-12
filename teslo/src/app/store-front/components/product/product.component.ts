import type { Product } from '@/products/interfaces/product-response.interface';
import { ProductImagePipe } from '@/products/pipes/ProductImage.pipe';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'store-front-product',
  imports: [RouterLink, ProductImagePipe],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  public product = input.required<Product>();

}

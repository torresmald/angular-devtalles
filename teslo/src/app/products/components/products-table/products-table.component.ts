import { Product } from '@/products/interfaces/product-response.interface';
import { ProductImagePipe } from '@/products/pipes/ProductImage.pipe';
import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {

  public products = input.required<Product[]>()
 }

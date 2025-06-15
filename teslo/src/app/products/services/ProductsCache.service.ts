import { Injectable } from '@angular/core';
import {
  Product,
  ProductResponse,
} from '../interfaces/product-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsCacheService {
  private _productsCache = new Map<string, ProductResponse>();
  private _productCache = new Map<string, Product>();

  public get productCache() {
    return this._productCache;
  }
  public set productCache(value) {
    this._productCache = value;
  }

  public get productsCache() {
    return this._productsCache;
  }
  public set productsCache(value) {
    this._productsCache = value;
  }

  public updateProductListChache(product: Product) {
    const productId = product.id;
    this._productCache.set(productId, product);
    this._productsCache.forEach((productResponse) => {
      productResponse.products = productResponse.products.map((currProd) => {
        return currProd.id === productId ? product : currProd;
      });
    });
  }
}

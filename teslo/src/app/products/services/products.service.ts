import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import type {
  Gender,
  Product,
  ProductResponse,
} from '../interfaces/product-response.interface';
import { environment } from 'src/environments/environment';
import { ProductsCacheService } from './ProductsCache.service';

interface QueryParams {
  limit?: number;
  offset?: number;
  gender?: Gender;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);
  private productsCacheService = inject(ProductsCacheService);

  public getProducts(
    queryParams: QueryParams = {}
  ): Observable<ProductResponse> {
    const { limit = 9, offset = 0, gender = '' } = queryParams;
    const key = `${limit}-${offset}-${gender}`;
    if (this.productsCacheService.productsCache.has(key)) {
      return of(this.productsCacheService.productsCache.get(key)!);
    }
    return this.http
      .get<ProductResponse>(`${environment.API_URL}/products`, {
        params: {
          limit,
          offset,
          gender,
        },
      })
      .pipe(
        tap((respose) =>
          this.productsCacheService.productsCache.set(key, respose)
        )
      );
  }

  public getProductBySlug(idSlug: string): Observable<Product> {
    const key = idSlug;
    if (this.productsCacheService.productCache.has(key)) {
      return of(this.productsCacheService.productCache.get(key)!);
    }
    return this.http
      .get<Product>(`${environment.API_URL}/products/${idSlug}`)
      .pipe(
        tap((product) =>
          this.productsCacheService.productCache.set(key, product)
        )
      );
  }
}

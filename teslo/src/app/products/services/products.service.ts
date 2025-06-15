import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import type {
  FilesUpload,
  Gender,
  Product,
  ProductResponse,
} from '../interfaces/product-response.interface';
import { environment } from 'src/environments/environment';
import { ProductsCacheService } from './productsCache.service';
import { User } from '@/auth/interfaces/user.interface';

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
  private newProduct: Product = {
    id: 'new',
    title: '',
    price: 0,
    description: '',
    slug: '',
    stock: 0,
    sizes: [],
    gender: '',
    tags: [],
    images: [],
    user: {} as User,
  };

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
    if (idSlug === 'new') {
      return of(this.newProduct);
    }
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

  public updateCreateProduct(
    id: string,
    productLike: Partial<Product>,
    fileList: FileList | null = null
  ): Observable<string> {
    if (id === 'new') {
      return this.uploadImages(fileList).pipe(
        map((imagesResponse) =>
          this.prepareProductsToUpdate(productLike, imagesResponse)
        ),
        switchMap((updatedProduct) =>
          this.http
            .post<Product>(`${environment.API_URL}/products`, updatedProduct)
            .pipe(map(() => 'Producto Creado'))
        )
      );
    }

    return this.uploadImages(fileList).pipe(
      map((imagesResponse) =>
        this.prepareProductsToUpdate(productLike, imagesResponse)
      ),
      switchMap((updatedProduct) =>
        this.http
          .patch<Product>(
            `${environment.API_URL}/products/${id}`,
            updatedProduct
          )
          .pipe(
            tap((product) => {
              this.productsCacheService.updateProductListChache(product);
            }),
            map(() => 'Producto Actualizado')
          )
      )
    );
  }

  public uploadImages(fileList: FileList | null): Observable<FilesUpload[]> {
    if (!fileList || fileList.length === 0) return of([]);

    const requests: Observable<FilesUpload>[] = [];

    Array.from(fileList).forEach((file) => {
      const formData = new FormData();
      formData.append('file', file);

      const request = this.http.post<FilesUpload>(
        `${environment.API_URL}/files/product`,
        formData
      );

      requests.push(request);
    });

    return forkJoin(requests);
  }

  private prepareProductsToUpdate(
    productLike: Partial<Product>,
    images: FilesUpload[]
  ) {
    return {
      ...productLike,
      images: [
        ...(productLike.images ?? []),
        ...images.map((img) => img.fileName),
      ],
    };
  }
}

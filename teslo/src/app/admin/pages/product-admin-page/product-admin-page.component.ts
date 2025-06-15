import { ProductsService } from '@/products/services/products.service';
import { Component, effect, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details/product-details.component';

@Component({
  selector: 'app-product-admin-page',
  imports: [ProductDetailsComponent],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public slugProduct = this.route.snapshot.params['id'];

  public productResource = rxResource({
    request: () => ({ idSlug: this.slugProduct }),
    loader: ({ request }) => {
      return this.productsService.getProductBySlug(request.idSlug);
    },
  });

  redirectEffect = effect(() => {
    if (this.productResource.error()) {
      this.router.navigateByUrl('/admin/products');
    }
  });

}

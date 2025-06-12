import { ProductsService } from '@/products/services/products.service';
import { ProductSliderComponent } from '@/store-front/components/product-slider/product-slider.component';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  imports: [ProductSliderComponent],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);
  public slugProduct = this.route.snapshot.params['id'];

  public productResource = rxResource({
    request: () => ({ idSlug: this.slugProduct }),
    loader: ({ request }) => {
      return this.productsService.getProductBySlug(request.idSlug);
    },
  });
}

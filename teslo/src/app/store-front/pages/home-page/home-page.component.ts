import { ProductsService } from '@/products/services/products.service';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/services/pagination.service';
import { ProductComponent } from '@/store-front/components/product/product.component';
import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-page',
  imports: [ProductComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  public productsService = inject(ProductsService);
  public paginationService = inject(PaginationService);

  public productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1 }),
    loader: ({ request }) => {
      const offset = isNaN(request.page) ? 0 : request.page
      return this.productsService.getProducts({
        offset: offset * 9,
      });
    },
  });
}

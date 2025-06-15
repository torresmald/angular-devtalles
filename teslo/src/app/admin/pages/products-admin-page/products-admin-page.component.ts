import { Component, inject, signal } from '@angular/core';
import { ProductsTableComponent } from '../../../products/components/products-table/products-table.component';
import { ProductsService } from '@/products/services/products.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/services/pagination.service';

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductsTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  private productsService = inject(ProductsService);
  public paginationService = inject(PaginationService);

  public limit = signal(9)

  public productsResource = rxResource({
    request: () => ({ page: this.paginationService.currentPage() - 1, limit: this.limit() }),
    loader: ({ request }) => {
      const offset = isNaN(request.page) ? 0 : request.page;

      return this.productsService.getProducts({
        offset: offset * 9,
        limit: request.limit
      });
    },
  });
}

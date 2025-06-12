import { ProductsService } from '@/products/services/products.service';
import { UpperCasePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ProductComponent } from '../../components/product/product.component';
import { map, tap } from 'rxjs';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/services/pagination.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gender-page',
  imports: [UpperCasePipe, ProductComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent implements OnInit {
  public productsService = inject(ProductsService);
  public paginationService = inject(PaginationService);
  public gender = signal('');
  public route = inject(ActivatedRoute);


  public genderSignal = toSignal(
    this.route.params.pipe(
      map((param) => param['gender'])
    )
  );

  ngOnInit() {
    // this.route.params.subscribe((value) => this.gender.set(value['gender']))
  }

  public productsGenderResource = rxResource({
    request: () => ({
      gender: this.genderSignal(),
      page: this.paginationService.currentPage() - 1,
    }),
    loader: ({ request }) => {
      return this.productsService.getProducts({
        gender: request.gender,
        offset: request.page,
      });
    },
  });
}

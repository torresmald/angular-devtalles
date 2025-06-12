import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  public route = inject(ActivatedRoute);

  public currentPage = toSignal(
    this.route.queryParams.pipe(map((page) => {
      if(+page['page']) return +page['page']
      return 1
    })),
    {
      initialValue: 1,
    }
  );
}

import { Component, inject, signal } from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifsService } from '@app/gifs/services/gifs-service.service';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  imports: [GifsListComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export default class SearchPageComponent {
  public gifsService = inject(GifsService);
  public queryString = signal('');
  public gifs = signal<Gif[]>([]);

  public searchGifs(queryString: string) {
    this.queryString.set(queryString)
    if (queryString.trim().length === 0) {
      return;
    }
    this.gifsService.searchGifs(queryString).subscribe((gifs) => {
      this.gifs.set(gifs);
    });
  }
}

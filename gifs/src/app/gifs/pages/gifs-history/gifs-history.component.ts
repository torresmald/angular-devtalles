import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { GifsService } from '@app/gifs/services/gifs-service.service';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gifs-history',
  imports: [GifsListComponent],
  templateUrl: './gifs-history.component.html',
})
export default class GifsHistoryComponent {
  public query = input<string>('');
  public gifsService = inject(GifsService);
  public gifs = signal<Gif[]>([]);
  public capitalizeQuery = computed(
    () => this.query().charAt(0).toUpperCase() + this.query().slice(1)
  );

  public gifsChanged = effect(() => {
    this.gifs.set(this.gifsService.loadSearchHistory(this.query()));
  });

}

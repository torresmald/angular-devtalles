import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
  AfterViewInit,
} from '@angular/core';
import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';
import { GifsService } from '@app/gifs/services/gifs-service.service';
import { Gif } from '@app/gifs/interfaces/gif.interface';
import { ScrollService } from '@app/shared/services/scroll.service';

@Component({
  selector: 'app-trending-page',
  imports: [GifsListComponent],
  templateUrl: './trending-page.component.html',
  styleUrl: './trending-page.component.css',
})
export default class TrendingPageComponent implements AfterViewInit {
  public scrollService = inject(ScrollService);
  // public currentScroll = signal<number>(this.scrollService.getCurrentScroll());
  public currentScroll = signal<number>(this.scrollService.currentScroll());
  public gifsService = inject(GifsService);
  public gifs = computed<Gif[]>(() => this.gifsService.gifs());
  public groupDiv = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.groupDiv()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollService.currentScroll();
  }

  public chagedScroll = effect(() => {
    // this.scrollService.setCurrentScroll(this.currentScroll());
    this.scrollService.currentScroll.set(this.currentScroll());
  });

  public onRequestMoreGifs(requestMoreGifs: boolean) {
    if (!requestMoreGifs) return;
    this.gifsService.onRequestMoreGifs();
  }

  public onScroll() {
    const divRef = this.groupDiv()?.nativeElement;
    if (!divRef) return;
    this.currentScroll.set(divRef.scrollTop);
    const clientHeight = divRef.clientHeight;
    const scrollHeight = divRef.scrollHeight;
    const isFinishedScroll =
      this.currentScroll() + clientHeight >= scrollHeight;
    if (isFinishedScroll) {
      this.gifsService.loadTrendingGifs();
    }
  }
}

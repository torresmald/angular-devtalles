import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavOption } from '@app/gifs/interfaces/nav-option.interface';
import { GifsService } from '@app/gifs/services/gifs-service.service';

@Component({
  selector: 'app-gifs-side-menu-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './gifs-side-menu-nav.component.html',
  styleUrl: './gifs-side-menu-nav.component.css'
})
export class GifsSideMenuNavComponent {

  public gifsService = inject(GifsService)
  public gifsSearched = this.gifsService.searchHistoryKeys

  public navOptions: NavOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      sublabel: 'Most popular Gifs',
      route: 'trending'
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Search',
      sublabel: 'Search Gifs',
      route: 'search'
    }
  ]
}

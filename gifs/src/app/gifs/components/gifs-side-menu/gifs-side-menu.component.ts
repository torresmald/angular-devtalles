import { Component } from '@angular/core';
import { GifsSideMenuNavComponent } from '../gifs-side-menu-nav/gifs-side-menu-nav.component';
import { GifsSideMenuHeaderComponent } from '../gifs-side-menu-header/gifs-side-menu-header.component';

@Component({
  selector: 'app-gifs-side-menu',
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuNavComponent],
  templateUrl: './gifs-side-menu.component.html',
  styleUrl: './gifs-side-menu.component.css'
})
export class GifsSideMenuComponent {

}

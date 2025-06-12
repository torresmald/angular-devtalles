import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';

import mapboxgl from 'mapbox-gl';

interface Coords {
  lng: number;
  lat: number;
}
@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.component.html',
})
export class MiniMapComponent implements AfterViewInit {
  public mapDiv = viewChild<ElementRef>('map');
  public map = signal<mapboxgl.Map | null>(null);
  public coords = input.required<Coords>();

  ngAfterViewInit(): void {
    if (!this.mapDiv()?.nativeElement) return;
    const map = new mapboxgl.Map({
      container: this.mapDiv()?.nativeElement, // container ID
      center: [this.coords().lng, this.coords().lat], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: 17, // starting zoom
    });
  }
}

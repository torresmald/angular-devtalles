import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  viewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-full-screen-map-page',
  imports: [],
  templateUrl: './full-screen-map-page.component.html',
})
export class FullScreenMapPageComponent implements AfterViewInit {
  public mapDiv = viewChild<ElementRef>('map');
  public zoom = signal(9);
  public map = signal<mapboxgl.Map | null>(null);

  ngAfterViewInit(): void {
    if (!this.mapDiv()?.nativeElement) return;
    const map = new mapboxgl.Map({
      container: this.mapDiv()?.nativeElement, // container ID
      center: [-74.5, 40], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom(), // starting zoom
    });
    this.mapListeners(map);
  }

  zoomEffect = effect(() => {
    this.map()?.setZoom(this.zoom());
  });

  onChangeZoom(type: 'add' | 'minus') {
    type === 'add'
      ? this.zoom.update((previous) => previous + 1)
      : this.zoom.update((previous) => previous - 1);
  }
  onRangeZoom(value: string) {
    this.zoom.set(parseInt(value));
  }

  private mapListeners(map: mapboxgl.Map) {
    map.on('zoomend', () => {
      const zoom = map.getZoom();
      this.zoom.set(zoom);
    });

    this.map.set(map);
  }
}

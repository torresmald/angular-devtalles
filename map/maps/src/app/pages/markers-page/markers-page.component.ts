import { Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike, MapMouseEvent } from 'mapbox-gl';
import { getRandomColor } from '../helpers/color-generator';
import { v4 as UuidV4 } from 'uuid';
interface Marker {
  id: string;
  marker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent {
  public mapDiv = viewChild<ElementRef>('map');
  public zoom = signal(14);
  public map = signal<mapboxgl.Map | null>(null);
  public markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if (!this.mapDiv()?.nativeElement) return;

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(true);
      }, 100);
    });
    const map = new mapboxgl.Map({
      container: this.mapDiv()?.nativeElement, // container ID
      center: [-3.674869209156225, 40.179968306771464], // starting position [lng, lat]. Note that lat must be set between -90 and 90
      zoom: this.zoom(), // starting zoom
    });

    this.mapListeners(map);
  }

  private mapListeners(map: mapboxgl.Map) {
    map.on('click', (event) => {
      const markerClick = this.mapClick(event);
      const { newMarker, lngLat } = markerClick;
      newMarker.marker.setLngLat([lngLat.lng, lngLat.lat]).addTo(map);
      this.markers.set([newMarker, ...this.markers()]);
    });

    this.map.set(map);
  }

  private mapClick(event: MapMouseEvent) {
    const colorString: string = getRandomColor();
    const lngLat = event.lngLat;
    const marker = new mapboxgl.Marker({
      color: colorString,
      draggable: false,
    });
    const newMarker: Marker = {
      id: UuidV4(),
      marker,
    };

    return { newMarker, lngLat };
  }

  public onGoToMarker(coords: LngLatLike) {
    if (!this.map()) return;
    this.map()?.flyTo({
      center: coords,
      zoom: this.zoom(), // puedes ajustar el nivel de zoom
      speed: 1.2, // velocidad de animación
      curve: 1.42, // suavidad
      essential: true, // asegura que funcione con modo de accesibilidad
    });
  }

  onRemoveMarker(marker: Marker) {
    marker.marker.remove();
    this.markers.update((prevMarkers) => {
      return prevMarkers.filter(markerFiltered => markerFiltered.id !== marker.id)
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy-response.interface';
import { map, Observable, tap } from 'rxjs';
import { Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);
  private LIMIT = 10;
  public searchHistory = signal<Record<string, Gif[]>>({});
  public searchHistoryKeys = computed(() => {
    return Object.keys(this.searchHistory());
  });
  private currentOffset = signal<number>(0);
  public gifs = signal<Gif[]>([])

  constructor(){
    this.loadTrendingGifs()
  }

  public loadTrendingGifs() {
    this.http
      .get<GiphyResponse>(`${environment.apiGiphyUrl}/trending`, {
        params: {
          api_key: environment.apiGiphyKey,
          limit: this.LIMIT,
          offset: this.currentOffset() * this.LIMIT,
        },
      })
      .pipe(map((response) => this.returnResponse(response))).subscribe(gifs => this.gifs.update((current) => [...current, ...gifs]));
  }

  public searchGifs(queryString: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.apiGiphyUrl}/search`, {
        params: {
          api_key: environment.apiGiphyKey,
          q: queryString,
          limit: this.LIMIT,
          offset: this.currentOffset() * this.LIMIT,
        },
      })
      .pipe(
        map((response) => this.returnResponse(response)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [queryString.toLowerCase()]: items,
          }));
        }),
        tap(() => this.saveSearchHistory())
      );
  }

  private returnResponse(response: GiphyResponse): Gif[] {
    this.currentOffset.update((current) => current + 1);
    return response.data.map((gif: any) => ({
      id: gif.id,
      url: gif.images.original.url,
      image: gif.images.original.webp,
      pagination: response.pagination,
    }));
  }

  private saveSearchHistory() {
    localStorage.setItem('gifs', JSON.stringify(this.searchHistory()));
  }

  public loadSearchHistory(queryString: string): Gif[] | [] {
    const history = localStorage.getItem('gifs');
    if (history) {
      const parsedHistory: Record<string, Gif[]> = JSON.parse(history);
      return parsedHistory[queryString];
    }
    return [];
  }

  public onRequestMoreGifs(queryString: string = '') {
    if (queryString) {
      return this.searchGifs(queryString);
    }
    return this.loadTrendingGifs();
  }
}

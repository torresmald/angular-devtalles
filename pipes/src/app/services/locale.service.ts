import { Injectable, signal } from '@angular/core';

type Locale = 'es' | 'fr' | 'en';
@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  private currentLocale = signal<Locale>('es');

  getLocale() {
    return this.currentLocale();
  }

  constructor() {
    this.currentLocale.set((localStorage.getItem('locale') as Locale) ?? 'es');
  }

  changeLocale(local: Locale) {
    localStorage.setItem('locale', local);
    this.currentLocale.set(local);
    window.location.reload();
  }
}

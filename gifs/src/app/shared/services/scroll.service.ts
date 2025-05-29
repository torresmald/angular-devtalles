import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  public currentScroll = signal<number>(this.getCurrentScroll())
  public setCurrentScroll(current: number){
    localStorage.setItem('scroll', JSON.stringify(current))
  }

  public getCurrentScroll(): number{
    const current = localStorage.getItem('scroll')
    if(!current) return this.currentScroll()
    return JSON.parse(current)
  }
}

import { Component, signal, effect } from '@angular/core';

@Component({
  selector: 'app-counter-page',
  templateUrl: './counter-page.component.html',
})
export class CounterPageComponent {
  constructor() {
    effect(() => {
      console.log(`The count is: ${this.counterSignal()}`);
    });
  }

  public counter: number = 10;
  public counterSignal = signal<number>(10);

  public increment(value: number) {
    this.counter += value;
  }

  public incrementSignal(value: number) {
    this.counterSignal.update((current) => current + value);
  }

  public reset() {
    this.counter = 10;
    this.counterSignal.update((current) => (current = 10));
  }
}

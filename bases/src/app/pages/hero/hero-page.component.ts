import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent {
  public name = signal('Ironman');
  public age = signal(45);
  public getHeroDescription() {
    return `${this.name()} - ${this.age()}`;
  }

  public capitalizeName = computed(() => {
    return this.name().toUpperCase();
  })

  public changeHero() {
    this.name.set('Spiderman');
    this.age.set(22);
  }

  public changeAge() {
    this.age.set(60);
  }

  public resetForm() {
    this.name.set('Ironman');
    this.age.set(45);
  }
}

import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

@Injectable({
  providedIn: 'root',
})
export class DragonBallCharactersService {
  readLocalStorage = () => {
    const characters = localStorage.getItem('characters');
    if (characters) {
      return JSON.parse(characters);
    }
    return [];
  };

  public characters = signal<Character[]>(this.readLocalStorage());
  public onAddCharacter(character: Character) {
    character.id = this.characters().length + 1;
    this.characters.update((chars) => {
      return [...chars, character];
    });
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()));
  });
}

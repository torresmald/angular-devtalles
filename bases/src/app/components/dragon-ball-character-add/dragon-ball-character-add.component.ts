import { Component, output, signal } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragon-ball-character-add',
  templateUrl: './dragon-ball-character-add.component.html',
})
export class DragonBallCharacterAddComponent {
  public name = signal('');
  public power = signal(0);
  public character = output<Character>();

  public onSetName(name: string) {
    this.name.set(name);
  }
  public onSetPower(power: number) {
    this.power.set(power);
  }

  public onAddCharacter() {
    const newCharacter: Character = {
      id: 1,
      name: this.name(),
      power: this.power(),
    };
    this.character.emit(newCharacter);
    this.name.set('');
    this.power.set(0);
  }
}

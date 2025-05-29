import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../../interfaces/character.interface';

@Component({
  selector: 'app-dragon-ball-list',
  templateUrl: './dragon-ball-list.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DragonBallListComponent {

  public characters = input.required<Character[]>()
  public listName = input.required<string>()

}

import { Component, inject } from '@angular/core';
import { DragonBallListComponent } from "../../components/dragon-ball-list/dragon-ball-list.component";
import { DragonBallCharacterAddComponent } from "../../components/dragon-ball-character-add/dragon-ball-character-add.component";
import { DragonBallCharactersService } from '../../services/dragon-ball-characters.service';

@Component({
  selector: 'app-dragon-ball',
  templateUrl: './dragon-ball.component.html',
  imports: [DragonBallListComponent, DragonBallCharacterAddComponent],
})
export class DragonBallComponent {
    public characterService = inject(DragonBallCharactersService)

}

import { Component, ElementRef, input, output, viewChild, } from '@angular/core';
import { GifsListItemComponent } from '../gifs-list-item/gifs-list-item.component';
import { Gif } from '@app/gifs/interfaces/gif.interface';

@Component({
  selector: 'app-gifs-list',
  imports: [GifsListItemComponent],
  templateUrl: './gifs-list.component.html',
})
export class GifsListComponent  {
  public gifs = input.required<Gif[]>()

  public groupDiv = viewChild<ElementRef<HTMLDivElement>>('groupDiv')
  public requestMoreGifs = output<boolean>()

  public onScroll(){
    console.log('Hago Scroll');

    const divRef = this.groupDiv()?.nativeElement
    if(!divRef) return
    const scrollTop = divRef.scrollTop;
    const clientHeight = divRef.clientHeight
    const scrollHeight = divRef.scrollHeight

    const isFinishedScroll = (scrollTop +  clientHeight) >= scrollHeight
    console.log(isFinishedScroll);

    if(isFinishedScroll){
      this.requestMoreGifs.emit(true)
    }

  }
}

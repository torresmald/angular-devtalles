import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
  styles: ``,
})
export default class BasicPageComponent {

  public toLowerCase = signal('JONATHAN')
  public toUpperCase = signal('jonathan')
  public capitalize = signal('JoNaTHAn')

  public date = signal(new Date())

  public localeService = inject(LocaleService)
}

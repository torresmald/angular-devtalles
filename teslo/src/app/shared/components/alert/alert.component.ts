import { Component, input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
})
export class AlertComponent {

  public errorMessage = input.required<string>()
  public errorColor = input.required<'error'|'success'>()
}

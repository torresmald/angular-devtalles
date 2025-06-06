import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormHelpers } from '../../../helpers/form.helpers';
@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.component.html',
})
export default class SwitchesPageComponent {

  private fb = inject(FormBuilder)
  formUtils = FormHelpers;

  public myForm: FormGroup = this.fb.group({
    radio: ['M', [Validators.required]],
    notifications: [false],
    terms: [false, [Validators.requiredTrue]]
  })

  public onSubmit(){
    this.myForm.markAllAsTouched()
    if(this.myForm.invalid) return
    console.log(this.myForm.value);
  }
}

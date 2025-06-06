import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormHelpers } from '../../../helpers/form.helpers';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {
  private fb = inject(FormBuilder);

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.min(10)]],
    inStock: [0, [Validators.min(0)]],
  });

  public isValidField(fieldName: string): boolean | null {
    return FormHelpers.isValidField(this.myForm, fieldName)
  }

  public getFieldError(fieldName: string): string | null {
   return FormHelpers.getFieldError(this.myForm, fieldName)
  }

  public onSave(){
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
    }
    console.log(this.myForm.value);
    this.myForm.reset()
  }
}

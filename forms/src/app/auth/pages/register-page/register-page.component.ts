import { JsonPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormHelpers } from '../../../helpers/form.helpers';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  private fb = inject(FormBuilder);

  public formUtils = FormHelpers;

  public myForm: FormGroup = this.fb.group(
    {
      name: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.namePattern)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
        [this.formUtils.checkingServer]
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(this.formUtils.notOnlySpacesPattern),
          Validators.minLength(6),
          this.formUtils.isInvalidUser
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validators: this.formUtils.isField1DifferentField2(
        'password',
        'confirmPassword'
      ),
    }
  );

  onSubmit() {
    this.myForm.markAllAsTouched();
    if (this.myForm.invalid) return;
    console.log(this.myForm.value);
  }
}

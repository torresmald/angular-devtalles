import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@/auth/services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register-page.component.html',
})
export default class RegisterPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public hasError = signal(false);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public onSubmitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password, fullName } = this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService
      .register(email, password, fullName)
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.showError();
          return;
        }
        this.router.navigateByUrl('/');
        return;
      });
  }

  private showError() {
    this.hasError.set(true);
    setTimeout(() => {
      this.hasError.set(false);
      this.loginForm.reset();
    }, 2000);
  }
}

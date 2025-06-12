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
  selector: 'app-login-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
})
export default class LoginPageComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  public hasError = signal(false);

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  public onSubmitForm() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { email, password } = this.loginForm.value;
    console.log(this.loginForm.value);
    this.authService.login(email, password).subscribe((isAuthenticated) => {
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

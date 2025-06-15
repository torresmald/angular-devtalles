import { inject } from '@angular/core';
import {
  Router,
  CanMatchFn,
  Route,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

const allowEnterAuth: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authStatus = authService.getAuthStatus();
  if (authStatus === 'authenticated') {
    router.navigateByUrl('/');
    return false;
  }
  console.log('Continuo navegacion');

  return true;
};

export default allowEnterAuth;

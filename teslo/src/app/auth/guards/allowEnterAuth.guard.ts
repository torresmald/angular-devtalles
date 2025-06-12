import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanMatchFn,
  Route,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

const allowEnterAuth: CanMatchFn = async (
  route: Route,
  segments: UrlSegment[]
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLogged = await firstValueFrom(authService.checkStatus());
  console.log('isLogged:', isLogged);
  if (isLogged) {
    console.log('NUNCA ENTRO AQUI');

    router.navigateByUrl('/');
    return false
  }
  console.log('Continuo navegacion');

  return true;
};

export default allowEnterAuth;

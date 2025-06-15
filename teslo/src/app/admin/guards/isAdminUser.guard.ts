import { AuthService } from '@/auth/services/auth.service';
import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

const isAdminUser: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  const isAdminUser = authService.isAdminUser()
  if (!isAdminUser) {
    return router.navigate(['/']);
  }

  return true;
};

export default isAdminUser;

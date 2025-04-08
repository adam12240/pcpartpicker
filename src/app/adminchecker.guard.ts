import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const admincheckerGuard: CanActivateFn = async (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.userData) {
    router.navigate(['/']);
    return false;
  }

  if (auth.isAdmin()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};                            
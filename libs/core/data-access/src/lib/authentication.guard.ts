import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationDataService } from './authentication-data.service';
import { AuthGuardRouteData } from '../../../models/src';

const LOGIN_REDIRECT = '/login';
const FORBIDDEN_REDIRECT = '/';

export const authGuard: CanActivateFn = (route) => {
  const auth = inject(AuthenticationDataService);

  const router = inject(Router);

  const data = (route.data ?? {}) as AuthGuardRouteData;

  if (!auth.isAuthenticated()) {
    const target = data.redirectTo ?? LOGIN_REDIRECT;
    return router.parseUrl(target);
  }

  if (data.roles?.length && !auth.hasRole(data.roles)) {
    const target = data.forbiddenRedirectTo ?? data.redirectTo ?? FORBIDDEN_REDIRECT;
    return router.parseUrl(target);
  }

  return true;
};

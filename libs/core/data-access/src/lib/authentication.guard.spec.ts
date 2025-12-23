import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  provideRouter,
} from '@angular/router';
import { authGuard } from './authentication.guard';
import { AuthenticationDataService } from './authentication-data.service';
import { AuthGuardRouteData } from '@support-dashboard/core/models';

@Component({ template: '' })
class DummyComponent {}

const runGuard = (routeData?: AuthGuardRouteData) =>
  TestBed.runInInjectionContext(() =>
    authGuard(
      { data: routeData ?? {}, params: {}, queryParams: {} } as unknown as ActivatedRouteSnapshot,
      { url: '/secure' } as RouterStateSnapshot,
    ),
  );

describe('authGuard', () => {
  let router: Router;
  let authService: AuthenticationDataService;

  beforeEach(async () => {
    localStorage.clear();
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: DummyComponent },
          { path: 'login', component: DummyComponent },
        ]),
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthenticationDataService);
  });

  it('redirects unauthenticated users', () => {
    const result = runGuard({ redirectTo: '/login' });

    expect(router.serializeUrl(result as any)).toBe('/login');
  });

  it('allows authenticated users when no roles are required', async () => {
    await authService.login({ email: 'agent@example.com', password: 'agent' });

    const result = runGuard();

    expect(result).toBe(true);
  });

  it('blocks users who lack the required role', async () => {
    await authService.login({ email: 'agent@example.com', password: 'agent' });

    const result = runGuard({ roles: ['Admin'], forbiddenRedirectTo: '/forbidden' });

    expect(router.serializeUrl(result as any)).toBe('/forbidden');
  });

  it('allows users with the required role', async () => {
    await authService.login({ email: 'admin@example.com', password: 'admin' });

    const result = runGuard({ roles: ['Admin'] });

    expect(result).toBe(true);
  });
});

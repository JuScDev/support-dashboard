import { describe, it, expectTypeOf } from 'vitest';
import { AuthCredentials, AuthGuardRouteData, AuthSession, AuthUser, UserRole } from './models';

describe('core models contract', () => {
  it('describes an authenticated user', () => {
    const user: AuthUser = {
      id: 'u-123',
      name: 'Casey Customer',
      email: 'casey@example.com',
      role: 'Agent',
      active: true,
    };

    expectTypeOf(user.id).toBeString();
    expectTypeOf(user.role).toEqualTypeOf<UserRole>();
    expectTypeOf(user.active).toBeBoolean();
  });

  it('describes an authentication session', () => {
    const session: AuthSession = {
      user: {
        id: 'u-456',
        name: 'Ada Admin',
        email: 'ada@example.com',
        role: 'Admin',
        active: true,
      },
      token: 'session-token',
      issuedAt: Date.now(),
    };

    expectTypeOf(session.token).toBeString();
    expectTypeOf(session.user.role).toEqualTypeOf<UserRole>();
    expectTypeOf(session.issuedAt).toBeNumber();
  });

  it('supports route guard metadata and credentials', () => {
    const routeData: AuthGuardRouteData = {
      roles: ['Admin', 'Agent'],
      redirectTo: '/login',
      forbiddenRedirectTo: '/forbidden',
    };
    const credentials: AuthCredentials = { email: 'user@example.com', password: 'secret' };

    expectTypeOf(routeData.roles).toEqualTypeOf<Array<UserRole> | undefined>();
    expectTypeOf(routeData.redirectTo).toEqualTypeOf<string | undefined>();
    expectTypeOf(routeData.forbiddenRedirectTo).toEqualTypeOf<string | undefined>();
    expectTypeOf(credentials.password).toBeString();
  });
});

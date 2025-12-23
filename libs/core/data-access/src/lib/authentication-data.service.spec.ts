import { TestBed } from '@angular/core/testing';
import { AuthenticationDataService, AUTH_SESSION_STORAGE_KEY } from './authentication-data.service';
import { AuthSession } from '../../../models/src';

const createService = (): AuthenticationDataService => {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({});
  return TestBed.inject(AuthenticationDataService);
};

describe('AuthService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts unauthenticated', () => {
    const service = createService();

    expect(service.isAuthenticated()).toBe(false);
    expect(service.user()).toBeNull();
  });

  it('logs in a valid admin user', async () => {
    const service = createService();

    const session = await service.login({ email: 'admin@example.com', password: 'admin' });

    expect(session.user.role).toBe('Admin');
    expect(service.isAuthenticated()).toBe(true);
    expect(service.hasRole('Admin')).toBe(true);
  });

  it('rejects invalid credentials', async () => {
    const service = createService();

    await expect(service.login({ email: 'unknown@example.com', password: 'nope' })).rejects.toThrow(
      'Invalid email or password',
    );
    expect(service.isAuthenticated()).toBe(false);
  });

  it('clears the session on logout', async () => {
    const service = createService();
    await service.login({ email: 'agent@example.com', password: 'agent' });

    service.logout();

    expect(service.isAuthenticated()).toBe(false);
    expect(localStorage.getItem(AUTH_SESSION_STORAGE_KEY)).toBeNull();
  });

  it('respects role checks for the current user', async () => {
    const service = createService();
    await service.login({ email: 'agent@example.com', password: 'agent' });

    expect(service.hasRole('Agent')).toBe(true);
    expect(service.hasRole('Admin')).toBe(false);
    expect(service.hasRole(['Admin', 'Agent'])).toBe(true);
  });

  it('restores a persisted session on startup', () => {
    const persistedSession: AuthSession = {
      user: {
        id: 'u-agent',
        name: 'Alex Agent',
        email: 'agent@example.com',
        role: 'Agent',
        active: true,
      },
      token: 'persisted-token',
      issuedAt: 123,
    };

    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(persistedSession));

    const service = createService();

    expect(service.isAuthenticated()).toBe(true);
    expect(service.user()?.email).toBe('agent@example.com');
  });
});

import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { AuthenticationApiService } from './authentication-api.service';
import { AuthenticationDataService } from '@support-dashboard/core/data-access';
import { AuthUser, UserRole } from '@support-dashboard/core/models';

const mockUser: AuthUser = {
  id: 'u-mock',
  name: 'Maya Mock',
  email: 'mock@example.com',
  role: 'Agent',
  active: true,
};

type AuthDataMock = {
  isAuthenticated: ReturnType<typeof vi.fn>;
  user: ReturnType<typeof vi.fn>;
  login: ReturnType<typeof vi.fn>;
  logout: ReturnType<typeof vi.fn>;
  hasRole: ReturnType<typeof vi.fn>;
};

describe('AuthenticationApiService', () => {
  let service: AuthenticationApiService;
  let authData: AuthDataMock;

  beforeEach(() => {
    authData = {
      isAuthenticated: vi.fn().mockReturnValue(true),
      user: vi.fn().mockReturnValue(mockUser),
      login: vi.fn().mockResolvedValue(undefined),
      logout: vi.fn(),
      hasRole: vi.fn().mockReturnValue(true),
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [{ provide: AuthenticationDataService, useValue: authData }],
    });

    service = TestBed.inject(AuthenticationApiService);
  });

  it('exposes auth state from the data layer', () => {
    expect(service.isAuthenticated).toBe(true);
    expect(authData.isAuthenticated).toHaveBeenCalledTimes(1);

    expect(service.user).toEqual(mockUser);
    expect(authData.user).toHaveBeenCalledTimes(1);
  });

  it('delegates login to the data layer', () => {
    const credentials = { email: 'agent@example.com', password: 'agent' };

    service.login(credentials);

    expect(authData.login).toHaveBeenCalledWith(credentials);
  });

  it('delegates logout to the data layer', () => {
    service.logout();

    expect(authData.logout).toHaveBeenCalledTimes(1);
  });

  it('checks roles through the data layer', () => {
    const roles = ['Admin', 'Agent'] as Array<UserRole>;

    const result = service.hasRole(roles);

    expect(result).toBe(true);
    expect(authData.hasRole).toHaveBeenCalledWith(roles);
  });
});

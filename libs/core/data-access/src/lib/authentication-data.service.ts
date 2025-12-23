import { Injectable, computed, signal } from '@angular/core';
import { AuthCredentials, AuthSession, AuthUser, UserRole } from '@support-dashboard/core/models';

export const AUTH_SESSION_STORAGE_KEY = 'support-dashboard.auth.session';

interface AuthUserRecord {
  credentials: AuthCredentials;
  user: AuthUser;
}

const MOCK_USERS: Array<AuthUserRecord> = [
  {
    credentials: { email: 'admin@example.com', password: 'admin' },
    user: {
      id: 'u-admin',
      name: 'Ada Admin',
      email: 'admin@example.com',
      role: 'Admin',
      active: true,
    },
  },
  {
    credentials: { email: 'agent@example.com', password: 'agent' },
    user: {
      id: 'u-agent',
      name: 'Alex Agent',
      email: 'agent@example.com',
      role: 'Agent',
      active: true,
    },
  },
];

@Injectable({ providedIn: 'root' })
export class AuthenticationDataService {
  private readonly _session = signal<AuthSession | null>(this._restoreSession());

  public readonly user = computed(() => this._session()?.user ?? null);
  private readonly _role = computed(() => this._session()?.user.role ?? null);
  private readonly _authenticated = computed(() => this._session() !== null);

  public async login(credentials: AuthCredentials): Promise<AuthSession> {
    const normalizedEmail = credentials.email.trim().toLowerCase();
    const match = MOCK_USERS.find(
      ({ credentials: stored }) =>
        stored.email === normalizedEmail && stored.password === credentials.password,
    );

    if (!match) {
      throw new Error('Invalid email or password');
    }

    const session: AuthSession = {
      user: match.user,
      token: this._createToken(),
      issuedAt: Date.now(),
    };

    this._setSession(session);
    return session;
  }

  public logout(): void {
    this._setSession(null);
  }

  public isAuthenticated(): boolean {
    return this._authenticated();
  }

  public hasRole(roles: UserRole | Array<UserRole>): boolean {
    const role = this._role();
    if (!role) {
      return false;
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(role);
  }

  private _setSession(session: AuthSession | null): void {
    this._session.set(session);
    this._persistSession(session);
  }

  private _restoreSession(): AuthSession | null {
    if (!this._storageAvailable()) {
      return null;
    }

    const serializedSession = localStorage.getItem(AUTH_SESSION_STORAGE_KEY);
    if (!serializedSession) {
      return null;
    }

    try {
      const parsed = JSON.parse(serializedSession) as AuthSession;
      if (!parsed?.user?.email || !parsed?.token) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  }

  private _persistSession(session: AuthSession | null): void {
    if (!this._storageAvailable()) {
      return;
    }

    if (!session) {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      return;
    }

    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  private _storageAvailable(): boolean {
    try {
      const probeKey = '__auth_probe__';
      localStorage.setItem(probeKey, probeKey);
      localStorage.removeItem(probeKey);
      return true;
    } catch {
      return false;
    }
  }

  private _createToken(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;
  }
}

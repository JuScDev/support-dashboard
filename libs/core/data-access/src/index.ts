import { Injectable, computed, signal } from '@angular/core';
import { AuthCredentials, AuthSession, AuthUser, UserRole } from '../../models/src';

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
export class AuthenticationService {
  private readonly session = signal<AuthSession | null>(this.restoreSession());

  readonly currentSession = computed(() => this.session());
  readonly user = computed(() => this.session()?.user ?? null);
  readonly role = computed(() => this.session()?.user.role ?? null);
  readonly authenticated = computed(() => this.session() !== null);

  async login(credentials: AuthCredentials): Promise<AuthSession> {
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
      token: this.createToken(),
      issuedAt: Date.now(),
    };

    this.setSession(session);
    return session;
  }

  logout(): void {
    this.setSession(null);
  }

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  hasRole(roles: UserRole | Array<UserRole>): boolean {
    const role = this.role();
    if (!role) {
      return false;
    }

    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    return allowedRoles.includes(role);
  }

  private setSession(session: AuthSession | null): void {
    this.session.set(session);
    this.persistSession(session);
  }

  private restoreSession(): AuthSession | null {
    if (!this.storageAvailable()) {
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

  private persistSession(session: AuthSession | null): void {
    if (!this.storageAvailable()) {
      return;
    }

    if (!session) {
      localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
      return;
    }

    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  private storageAvailable(): boolean {
    try {
      const probeKey = '__auth_probe__';
      localStorage.setItem(probeKey, probeKey);
      localStorage.removeItem(probeKey);
      return true;
    } catch {
      return false;
    }
  }

  private createToken(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random().toString(16).slice(2)}`;
  }
}

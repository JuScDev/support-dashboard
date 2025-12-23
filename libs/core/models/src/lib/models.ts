export type UserRole = 'Admin' | 'Agent';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
}

export interface AuthSession {
  user: AuthUser;
  token: string;
  issuedAt: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthGuardRouteData {
  roles?: UserRole[];
  redirectTo?: string;
  forbiddenRedirectTo?: string;
}

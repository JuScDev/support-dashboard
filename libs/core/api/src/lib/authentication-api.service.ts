import { inject, Injectable } from '@angular/core';
import { AuthenticationDataService } from '../../../data-access/src/';
import { AuthCredentials, AuthUser, UserRole } from '../../../models/src/';

@Injectable({ providedIn: 'root' })
export class AuthenticationApiService {
  private readonly _authData = inject(AuthenticationDataService);

  public get isAuthenticated(): boolean {
    return this._authData.isAuthenticated();
  }

  public get user(): AuthUser | null {
    return this._authData.user();
  }

  public login(credentials: AuthCredentials): void {
    this._authData.login(credentials);
  }

  public logout(): void {
    this._authData.logout();
  }

  public hasRole(roles: UserRole | Array<UserRole>): boolean {
    return this._authData.hasRole(roles);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean | UrlTree> {
    return true;
    const user = await this.httpClient
      .get(`${environment.authUrl}/auth/getuser`)
      .toPromise();
    if (user) {
      this.authService.setUser(user);
      return true;
    } else {
      window.location.href = `${environment.authUrl}/auth/google`;
      return false;
    }
  }
}

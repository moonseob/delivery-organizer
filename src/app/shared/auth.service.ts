import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private username$ = new BehaviorSubject<User['displayName']>('');
  private email$ = new BehaviorSubject<string>('');
  getUsername() {
    return this.username$.asObservable();
  }

  getEmail() {
    return this.email$.asObservable();
  }

  getLogoutUrl() {
    return `${environment.authUrl}/auth/logout`;
  }

  getUser() {
    return this.httpClient
      .get<{ data: User }>(`${environment.apiUrl}/auth/getuser`, {
        withCredentials: true,
      })
      .pipe(
        pluck('data'),
        catchError(() => of(null)),
        tap((user) => {
          const username = user?.displayName;
          const email = user?.email;
          // const email = user?.emails[0]?.value;
          if (username) {
            this.username$.next(username);
          }
          if (email) {
            this.email$.next(email);
          }
        })
      );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, pluck, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile, User } from './models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private username$ = new BehaviorSubject<User['displayName']>('');
  getUsername() {
    return this.username$.asObservable();
  }

  getUser() {
    return this.httpClient
      .get<{ data: Profile }>(`${environment.apiUrl}/auth/getuser`, {
        withCredentials: true,
      })
      .pipe(
        pluck('data'),
        catchError(() => of(null)),
        tap((user) => {
          const username = user?.displayName;
          if (username) {
            this.username$.next(username);
          }
        })
      );
  }
}

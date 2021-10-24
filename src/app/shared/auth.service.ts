import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  public sessionUser$ = new BehaviorSubject<User | null>(null);

  setUser(user?: User): void {
    this.sessionUser$.next(user ?? null);
  }
  getUser(): Observable<User | null> {
    return this.sessionUser$;
  }
}

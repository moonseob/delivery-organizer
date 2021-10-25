import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$ = new BehaviorSubject<Cart[]>([]);

  getCart(): Observable<Cart[]> {
    return this.cart$.asObservable();
  }

  constructor() {}
}

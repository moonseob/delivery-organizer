import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, pluck } from 'rxjs/operators';
import { Restaurant } from 'src/app/shop/models/shop-info.model';
import { environment } from 'src/environments/environment';
import { WarningMessageComponent } from '../component/warning-message.component';
import { CartItem, UserCart } from '../models/cart.model';
import { Order } from '../models/order.model';

const initialCart = {
  restaurant_id: null,
  items: [],
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private dialog: MatDialog, private httpClient: HttpClient) {
    try {
      const cart = JSON.parse(localStorage?.getItem('cart') as string);
      if (cart != null) {
        const { items, restaurant_id } = cart;
        this.items = items;
        this.restaurantId = restaurant_id;
        this.updateCart();
      }
    } catch (e) {}
  }

  private restaurantName$ = new BehaviorSubject<Restaurant['name']>('');
  private restaurantId: UserCart['restaurant_id'] | null = null;
  private items: UserCart['items'] = [];
  private cart$ = new BehaviorSubject<UserCart>(initialCart);

  async addMenu(
    restaurantId: number,
    item: CartItem,
    name?: string
  ): Promise<void> {
    if (!!this.restaurantId && this.restaurantId !== restaurantId) {
      const result = await (this.dialog
        .open(WarningMessageComponent, {
          data: {
            message:
              '다른 음식점에서 이미 담은 메뉴가 있습니다. 담긴 메뉴를 취소하고 새로운 음식점에서 메뉴를 담을까요?',
          },
        })
        .afterClosed()
        .toPromise() as Promise<boolean>);
      if (!result) {
        return;
      }
      this.items = [];
    }
    this.restaurantName$.next(name ?? '');
    this.restaurantId = restaurantId;
    this.items = this.items.concat(item);
    this.updateCart();
  }

  removeMenu(slug: CartItem['slug']) {
    const targetIdx = this.items.findIndex((item) => item.slug === slug);
    if (targetIdx < 0) {
      console.warn('target menu not found');
      return;
    }
    this.items.splice(targetIdx, 1);
    this.updateCart();
  }

  updateCart() {
    const cart: UserCart = {
      restaurant_id: this.restaurantId,
      items: this.items,
    };
    this.setCart(cart);
  }

  setCart(cart: UserCart) {
    window.localStorage?.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
  }
  clearCart() {
    this.restaurantId = null;
    this.items = [];
    this.setCart(initialCart);
  }

  getCart() {
    return this.cart$.asObservable();
  }

  getCartRestaurantName() {
    return this.restaurantName$.asObservable();
  }

  sendCart(body: UserCart): Observable<boolean> {
    return this.httpClient
      .post<{ data: UserCart }>(`${environment.apiUrl}/order`, body, {
        withCredentials: true,
      })
      .pipe(
        map((res) => res?.data != null || false),
        catchError(() => of(false))
      );
  }

  getHistory() {
    return this.httpClient
      .get<{ data: Order[] }>(`${environment.apiUrl}/history`, {
        withCredentials: true,
      })
      .pipe(pluck('data'));
  }

  cancelOrder(orderId: string) {
    return this.httpClient
      .delete<{ success: boolean }>(`${environment.apiUrl}/order/${orderId}`, {
        withCredentials: true,
      })
      .pipe(pluck('success'));
  }

  // getAllOrders() {
  //   return this.httpClient.get<{ data: Order[] }>(`${environment.apiUrl}/orders`).pipe(pluck('data'))
  // }
}

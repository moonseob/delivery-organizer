import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { WarningMessageComponent } from '../component/warning-message.component';
import { CartItem, UserCart } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private dialog: MatDialog) {
    const cart = localStorage?.getItem('cart');
    if (cart != null) {
      this.cart$.next(JSON.parse(cart));
    }
  }

  private restaurantId: UserCart['restaurant_id'] | null = null;
  private items: UserCart['items'] = [];
  private cart$ = new BehaviorSubject<UserCart | null>(null);

  async addMenu(restaurantId: number, item: CartItem): Promise<void> {
    if (restaurantId !== this.restaurantId) {
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
    }
    this.items = this.items.concat(item);
    this.updateCart();
  }

  async removeMenu(slug: CartItem['slug']): Promise<void> {
    const targetIdx = this.items.findIndex((item) => item.slug === slug);
    if (targetIdx < 0) {
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
    const next = this.items.length > 0 ? cart : null;
    window.localStorage?.setItem('cart', JSON.stringify(next));
    this.cart$.next(next);
  }

  getCart() {
    return this.cart$.asObservable();
  }
}

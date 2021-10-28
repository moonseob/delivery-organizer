import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import BigNumber from 'bignumber.js';
import { BehaviorSubject } from 'rxjs';
import { shareReplay, take, tap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private ref: MatBottomSheetRef<ShoppingCartComponent>,
    private cdr: ChangeDetectorRef
  ) {}

  count: number = 0;
  gt: number = 0;
  name$ = this.cartService.getCartRestaurantName();

  /** null인 경우, 주문 전송이 완료된 상태를 뜻함 */
  isLoading$ = new BehaviorSubject<boolean | null>(false);

  removeItem(slug: string) {
    this.cartService.removeMenu(slug);
  }
  cart$ = this.cartService.getCart().pipe(
    tap((cart) => {
      this.count = cart?.items.length ?? 0;
      this.gt =
        cart?.items
          .reduce((acc, cur) => acc.plus(cur.price), new BigNumber(0))
          .toNumber() ?? 0;
      this.cdr.detectChanges();
    }),
    shareReplay(1)
  );

  async submit() {
    this.isLoading$.next(true);
    try {
      const cart = await this.cart$.pipe(take(1)).toPromise();
      const postResult = await this.cartService.sendCart(cart).toPromise();
      if (postResult) {
        this.isLoading$.next(null);
        // TODO: 성공 화면으로 넘어가는 로직
        this.cartService.clearCart();
      }
    } catch (e) {
      // nothing to do...
    }
    this.isLoading$.next(false);
  }

  close() {
    this.ref.dismiss();
  }

  ngOnInit(): void {}
}

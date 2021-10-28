import { Component, HostListener, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { map, shareReplay } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { ShoppingCartComponent } from './shopping-cart.component';

@Component({
  selector: 'app-shopping-cart-fab',
  templateUrl: './shopping-cart-fab.component.html',
  styleUrls: ['./shopping-cart-fab.component.scss'],
})
export class ShoppingCartFabComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private _bottomSheet: MatBottomSheet
  ) {}

  @HostListener('click') async open() {
    this._bottomSheet.open(ShoppingCartComponent);
  }
  count$ = this.cartService.getCart().pipe(
    map((cart) => cart?.items.length ?? 0),
    shareReplay(1)
  );

  ngOnInit(): void {}
}

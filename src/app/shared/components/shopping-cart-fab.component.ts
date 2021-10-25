import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart-fab',
  templateUrl: './shopping-cart-fab.component.html',
  styleUrls: ['./shopping-cart-fab.component.scss'],
})
export class ShoppingCartFabComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cart$ = this.cartService.getCart();

  count = 0;

  ngOnInit(): void {}
}

import { Component } from '@angular/core';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private cartService: CartService) {}

  cart$ = this.cartService.getCart();

  async openCart() {}
}

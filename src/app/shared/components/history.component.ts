import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(private cartService: CartService) {}

  now = new Date();

  history$ = this.cartService.getHistory();

  remove(orderId: string) {
    this.cartService.cancelOrder(orderId).subscribe();
  }

  ngOnInit(): void {}
}

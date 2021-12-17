import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { map, mergeMap, scan, switchMap } from 'rxjs/operators';
import { ShopApiService } from 'src/app/shop/services/shop-api.service';
import { Order } from '../models/order.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private shopService: ShopApiService
  ) {}

  now = new Date();
  getHistory() {
    return this.cartService.getHistory().pipe(
      switchMap((orderList) => from(orderList)),
      mergeMap((order: Order) =>
        this.shopService.getInfo(order.restaurant_id!.toString()).pipe(
          map((info) => ({
            ...order,
            name: info.name,
            items: order.items.map((item) => ({
              ...item,
              subchoices_array: Object.values(item.subchoices)
                .flatMap((sub) => sub.items)
                .map((subitem) => ({
                  name: subitem.name,
                  price: subitem.price,
                })),
            })),
          }))
        )
      ),
      scan((acc, cur) => acc.concat(cur), [] as Order[])
    );
  }

  history$ = this.getHistory();

  remove(orderId: string) {
    this.cartService.cancelOrder(orderId).subscribe({
      next: () => {
        this.history$ = this.getHistory();
      },
    });
  }

  ngOnInit(): void {}
}

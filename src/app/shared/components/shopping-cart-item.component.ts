import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../models/cart.model';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss'],
})
export class ShoppingCartItemComponent implements OnInit {
  constructor() {}

  @Input() item!: CartItem;
  subchoices!: {
    name: string;
    items: string;
  }[];

  @Output() remove = new EventEmitter<any>();

  ngOnInit(): void {
    this.subchoices = Object.values(this.item.subchoices).map(
      ({ name, items }) => ({
        name,
        items: items.map((x) => x.name).join(', '),
      })
    );
  }
}

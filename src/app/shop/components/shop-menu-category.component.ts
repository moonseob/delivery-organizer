import { Component, Input, OnInit } from '@angular/core';
import { ShopMenuCat } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-category',
  templateUrl: './shop-menu-category.component.html',
  styleUrls: ['./shop-menu-category.component.scss'],
})
export class ShopMenuCategoryComponent implements OnInit {
  @Input() category!: ShopMenuCat;

  constructor() {}

  ngOnInit(): void {}
}

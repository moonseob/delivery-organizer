import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Menu } from '../models/shop-menu.model';

@Component({
  selector: 'app-shop-menu-modal',
  templateUrl: './shop-menu-modal.component.html',
  styleUrls: ['./shop-menu-modal.component.scss'],
})
export class ShopMenuModalComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public menu: Menu) {}

  ngOnInit(): void {}
}

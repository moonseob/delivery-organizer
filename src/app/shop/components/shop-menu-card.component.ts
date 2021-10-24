import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Menu } from '../models/shop-menu.model';
import { ShopMenuModalComponent } from './shop-menu-modal.component';

@Component({
  selector: 'app-shop-menu-card',
  templateUrl: './shop-menu-card.component.html',
  styleUrls: ['./shop-menu-card.component.scss'],
})
export class ShopMenuCardComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  @Input() menu!: Menu;

  @HostListener('click') async onClick() {
    console.log('ahdla??');
    const result: any | null = await this.dialog
      .open(ShopMenuModalComponent, {
        data: this.menu,
      })
      .afterClosed()
      .toPromise();
    if (result != null) {
    }
  }

  ngOnInit(): void {}
}

import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { Menu } from '../models/shop-menu.model';
import { ShopMenuModalComponent } from './shop-menu-modal.component';

@Component({
  selector: 'app-shop-menu-card',
  templateUrl: './shop-menu-card.component.html',
  styleUrls: ['./shop-menu-card.component.scss'],
})
export class ShopMenuCardComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {
    this.shopId = this.route.snapshot.paramMap.get('id')!;
  }

  shopId!: string;

  @Input() menu!: Menu;

  @HostListener('click') async onClick() {
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { detail: true },
    });
    const result: CartItem | null = await this.dialog
      .open(ShopMenuModalComponent, {
        data: this.menu,
        width: '500px',
      })
      .afterClosed()
      .toPromise();
    this.router.navigate(['.'], { relativeTo: this.route });
    if (result != null) {
      this.cartService.addMenu(Number(this.shopId), result);
      console.log(result);
    }
  }

  ngOnInit(): void {}
}

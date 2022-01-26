import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { race } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/models/cart.model';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShopMenuCat } from '../models/shop-menu.model';
import { ShopMenuModalComponent } from './shop-menu-modal.component';

@Component({
  selector: 'app-shop-menu-category',
  templateUrl: './shop-menu-category.component.html',
  styleUrls: ['./shop-menu-category.component.scss'],
})
export class ShopMenuCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cartService: CartService,
    private location: Location
  ) {
    this.shopId = this.route.snapshot.paramMap.get('id')!;
  }

  shopId!: string;
  @Input() category!: ShopMenuCat;

  private openDialog(index: number): MatDialogRef<any> {
    const data = this.category.items[index];
    // 중복 dialog 열기 방지
    if (
      this.dialog.openDialogs.find((dialog) => dialog.id === data.slug) != null
    ) {
      throw Error('duplicate dialog of id ' + data.slug);
    }
    return this.dialog.open(ShopMenuModalComponent, {
      data,
      id: data.slug,
      width: '500px',
      closeOnNavigation: true,
      disableClose: true,
    });
  }

  ngOnInit(): void {
    let dialogRef: MatDialogRef<any> | null = null;
    this.route.params.pipe(pluck('menuId')).subscribe({
      next: async (menuId) => {
        if (menuId) {
          const menuIdx = this.category.items.findIndex(
            (item) => item.slug === menuId
          );
          if (menuIdx > -1) {
            console.log(menuIdx);
            try {
              dialogRef = this.openDialog(menuIdx)!;

              race(
                dialogRef.backdropClick(),
                dialogRef
                  ?.keydownEvents()
                  .pipe(filter((event) => event.key === 'Escape'))
              )
                .pipe()
                .subscribe({
                  next: () => this.location.back(),
                });
              const result: CartItem | null = await dialogRef
                ?.afterClosed()
                .toPromise();
              if (result != null) {
                this.cartService.addMenu(Number(this.shopId), result);
              }
            } catch (err) {}
          }
        } else {
          dialogRef?.close();
        }
      },
    });
  }
}

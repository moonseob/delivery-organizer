import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, shareReplay } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/models/cart.model';
import { AdminApiService } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(private apiService: AdminApiService, private fb: FormBuilder) {}

  formArray = this.fb.array([]);

  newShop() {
    const fg = this.fb.group({
      id: ['', Validators.required],
      due: ['', Validators.required],
    });
    this.formArray.push(fg);
  }

  removeShop(index: number) {
    this.formArray.removeAt(index);
  }

  updateShops() {
    // const data = this.formArray.value;
    const data = {
      '475929': new Date().toISOString(),
      '462893': new Date().toISOString(),
    };
    this.apiService
      .updateShopList(Object.entries(data).map(([id, due]) => ({ id, due })))
      .subscribe({
        next: () => alert('가게 목록의 업데이트에 성공했어요'),
      });
  }

  cartItems$ = this.apiService.getAllOrders().pipe(
    map((res) =>
      res.reduce((db, cur) => {
        const rid = cur.restaurant_id!.toString();
        const orderList = db[rid] ?? [];
        db[rid] = [...orderList, ...cur.items];
        return db;
      }, {} as { [rid: string]: CartItem[] })
    ),
    shareReplay(1)
  );

  cartKeys$ = this.cartItems$.pipe(map((cart) => Object.keys(cart)));
  getCart(key: string) {
    return this.cartItems$.pipe(map((cart) => cart[key]));
  }

  ngOnInit(): void {}
}

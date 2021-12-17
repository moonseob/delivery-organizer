import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, shareReplay } from 'rxjs/operators';
import { CartItem } from 'src/app/shared/models/cart.model';
import { ShopApiService } from 'src/app/shop/services/shop-api.service';
import { AdminApiService, ShopData } from '../services/admin-api.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private apiService: AdminApiService,
    private fb: FormBuilder,
    private shopService: ShopApiService
  ) {}

  addressGroup = this.fb.group({
    address: ['경기도 성남시 수정구 복정동 620-2 가천대학교'],
    zipcode: ['461200'],
  });

  formArray = this.fb.array([]);

  private getNowString(of: any = null) {
    const date = !!of ? new Date(of) : new Date();
    const y = date.getFullYear().toString().padStart(2, '0');
    const M = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${y}-${M}-${d}T${h}:${m}`;
  }

  newShop(id?: string, dueData?: any) {
    const due = this.getNowString(dueData);
    const fg = this.fb.group({
      id: [id, Validators.required],
      due: [due, Validators.required],
    });
    this.formArray.push(fg);
  }

  removeShop(index: number) {
    this.formArray.removeAt(index);
  }

  updateShops() {
    const data = this.formArray.value.map(
      (v: any) =>
        ({
          id: v.id,
          due: new Date(v.due).toISOString(),
        } as ShopData)
    );
    this.apiService.updateShopList(data).subscribe({
      next: (x) => {
        console.log(x);
        alert('가게 목록의 업데이트에 성공했어요');
      },
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
    return this.cartItems$.pipe(map((cart) => cart[key])).pipe(shareReplay(1));
  }

  async ngOnInit() {
    const shopList = await this.shopService.getShops().toPromise();
    shopList.forEach((shop) => {
      this.newShop(shop.id, shop.due);
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Order } from 'src/app/shared/models/order.model';
import { environment } from 'src/environments/environment';

interface ShopData {
  /** shop id */
  id: string;
  /** 주문 마감시간 */
  due: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  constructor(private httpClient: HttpClient) {}

  updateShopList(data: ShopData[]) {
    return this.httpClient
      .post<{ success: boolean }>(`${environment.apiUrl}/admin/shop_list`, {
        data,
      })
      .pipe(pluck('success'));
  }

  getAllOrders() {
    return this.httpClient
      .get<{ data: Order[] }>(`${environment.apiUrl}/orders`)
      .pipe(pluck('data'));
  }
}

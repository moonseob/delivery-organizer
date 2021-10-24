import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ShopInfo, ShopStats } from '../models/shop-info.model';
import { ShopMenuCat } from '../models/shop-menu.model';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  getList() {
    return this.httpClient
      .get<{ data: string[] }>(`${environment.apiUrl}/shop`)
      .pipe(pluck('data'));
  }
  getStats(shopId: string) {
    return this.httpClient.get<{ [shopId: string]: ShopStats }>(
      `${environment.apiUrl}/shop/${shopId}/stats`
    );
  }
  getInfo(shopId: string) {
    return this.httpClient.get<ShopInfo>(
      `${environment.apiUrl}/shop/${shopId}/info`
    );
  }
  getMenu(shopId: string) {
    return this.httpClient.get<ShopMenuCat[]>(
      `${environment.apiUrl}/shop/${shopId}/menu`
    );
  }
  constructor(private httpClient: HttpClient) {}
}

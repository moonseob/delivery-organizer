import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShopInfo } from '../models/shop-info.model';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  getInfo(shopId: string) {
    return this.httpClient.get<ShopInfo>(
      `${environment.apiUrl}/shop/${shopId}/info`
    );
  }
  getMenu(shopId: string) {
    return this.httpClient.get<any>(
      `${environment.apiUrl}/shop/${shopId}/menu`
    );
  }
  constructor(private httpClient: HttpClient) {}
}

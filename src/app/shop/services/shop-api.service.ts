import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ShopDetailedInfo } from '../models/shop-detailed-info.model';
import { Restaurant } from '../models/shop-info.model';
import { ShopMenuCat } from '../models/shop-menu.model';
import { ShopStats } from '../models/shop-stats.model';

@Injectable({
  providedIn: 'root',
})
export class ShopApiService {
  constructor(private httpClient: HttpClient) {}

  /** 오늘의 가게 목록 */
  getList() {
    return this.httpClient
      .get<{ data: string[] }>(`${environment.apiUrl}/shop`)
      .pipe(pluck('data'));
  }

  /** 가게별 주문 현황 */
  getStats(shopId: string) {
    return this.httpClient
      .get<{ data: ShopStats }>(`${environment.apiUrl}/shop/${shopId}/stats`)
      .pipe(pluck('data'));
  }

  /** 가게의 기본 정보 */
  getInfo(shopId: string) {
    return this.httpClient
      .get<{ data: Restaurant }>(`${environment.apiUrl}/shop/${shopId}`)
      .pipe(pluck('data'));
  }

  /** 가게의 상세 정보 */
  getDetailedInfo(shopId: string) {
    return this.httpClient
      .get<{ data: ShopDetailedInfo }>(
        `${environment.apiUrl}/shop/${shopId}/info`
      )
      .pipe(pluck('data'));
  }

  /** 가게의 메뉴(의 카테고리) 목록 */
  getMenu(shopId: string) {
    return this.httpClient
      .get<{ data: ShopMenuCat[] }>(`${environment.apiUrl}/shop/${shopId}/menu`)
      .pipe(pluck('data'));
  }
}

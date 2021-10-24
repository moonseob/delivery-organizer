import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { mergeMap, scan } from 'rxjs/operators';
import { ShopInfo } from '../models/shop-info.model';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss'],
})
export class ShopListComponent implements OnInit {
  constructor(private apiService: ShopApiService) {}

  list$ = this.apiService.getList().pipe(
    mergeMap((list) => from(list)),
    mergeMap((shopId) => this.apiService.getInfo(shopId)),
    scan((acc, cur) => acc.concat(cur), [] as ShopInfo[])
  );

  ngOnInit(): void {}
}

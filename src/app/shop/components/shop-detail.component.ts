import { Component, OnInit } from '@angular/core';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {
  constructor(private apiService: ShopApiService) {}

  shopId = '574077';

  info$ = this.apiService.getInfo(this.shopId);
  categories$ = this.apiService.getMenu(this.shopId);

  ngOnInit(): void {}
}

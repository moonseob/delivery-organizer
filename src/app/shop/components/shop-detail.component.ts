import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {
  constructor(
    private apiService: ShopApiService,
    private route: ActivatedRoute
  ) {}
  info$!: Observable<any>;
  categories$!: Observable<any>;

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('id');
    if (!!shopId) {
      this.info$ = this.apiService.getDetailedInfo(shopId);
      this.categories$ = this.apiService.getMenu(shopId);
    }
  }
}

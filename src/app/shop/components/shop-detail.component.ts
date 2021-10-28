import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/shared/services/cart.service';
import { ShopApiService } from '../services/shop-api.service';

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
})
export class ShopDetailComponent implements OnInit {
  constructor(
    private apiService: ShopApiService,
    private route: ActivatedRoute,
    private svc: CartService
  ) {}
  info$!: Observable<any>;
  detailedInfo$!: Observable<any>;
  categories$!: Observable<any>;

  cart$ = this.svc.getCart();

  ngOnInit(): void {
    const shopId = this.route.snapshot.paramMap.get('id');
    if (!!shopId) {
      this.info$ = this.apiService.getInfo(shopId);
      this.detailedInfo$ = this.apiService.getDetailedInfo(shopId);
      this.categories$ = this.apiService
        .getMenu(shopId)
        .pipe(
          map((res) => res.filter((cat) => cat.slug !== 'photo_menu_items'))
        );
    }
  }
}

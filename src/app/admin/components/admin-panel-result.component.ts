import { Component, Input, OnInit } from '@angular/core';
import {
  Cart,
  CartItem,
  CheckoutAddress,
} from 'src/app/shared/models/cart.model';
import { ShopApiService } from 'src/app/shop/services/shop-api.service';

@Component({
  selector: 'app-admin-panel-result',
  templateUrl: './admin-panel-result.component.html',
  styleUrls: ['./admin-panel-result.component.scss'],
})
export class AdminPanelResultComponent implements OnInit {
  constructor(private service: ShopApiService) {}

  @Input() shopId!: string;
  @Input() address!: CheckoutAddress;
  @Input() data!: CartItem[];

  resultCode = '';

  async getCodeString(key: string): Promise<Cart> {
    let existingCart: any = {};
    try {
      existingCart = JSON.parse(sessionStorage.getItem(key) || '{}');
    } catch (err) {
      console.warn(err);
    }
    const restaurant_id = Number(this.shopId);
    const isSameOrigin = existingCart?.restaurant_id === restaurant_id;
    const restaurant = isSameOrigin
      ? existingCart.restaurant
      : await this.service.getInfo(this.shopId).toPromise();
    const restaurant_name = restaurant.name;
    const items = (isSameOrigin ? existingCart.items : []).concat(this.data);
    // const
    return {
      restaurant_id,
      restaurant,
      restaurant_name,
      checkout_address: this.address,
      items,
      default_price: 0, // DEBUG
    };
  }

  async ngOnInit() {
    const ssKey = 'ngStorage-cart';
    const next = await this.getCodeString(ssKey);
    this.resultCode = `
    (function(){
      sessionStorage.setItem('${ssKey}', JSON.stringify(${JSON.stringify(
      next
    )}));location.reload();
    })()
    `;
  }

  copied(e: any) {
    alert(
      '클립보드 복사에 성공했어요.\n자바스크립트 호환성을 위해 크롬 브라우저를 사용해주세요.'
    );
  }
}

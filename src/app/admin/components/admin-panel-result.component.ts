import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CartItem, CheckoutAddress } from 'src/app/shared/models/cart.model';
import { Restaurant } from 'src/app/shop/models/shop-info.model';
import { ShopApiService } from 'src/app/shop/services/shop-api.service';

@Component({
  selector: 'app-admin-panel-result',
  templateUrl: './admin-panel-result.component.html',
  styleUrls: ['./admin-panel-result.component.scss'],
})
export class AdminPanelResultComponent implements OnChanges {
  constructor(private service: ShopApiService) {}

  @Input() shopId!: string;
  @Input() address!: CheckoutAddress;
  @Input() data!: CartItem[];

  private shopInfo?: Restaurant;

  ready = false;
  resultCode = '';

  async ngOnChanges(change: SimpleChanges) {
    const ssKey = 'ngStorage-cart';
    if (change.shopId) {
      this.shopInfo = await this.service.getInfo(this.shopId).toPromise();
    }
    console.log(this.shopInfo, this.address, this.data);
    this.ready =
      (this.shopInfo && this.address && this.data?.length > 0) || false;
    if (this.ready) {
      console.log('update resultCode');
      this.resultCode = `
        const cartItemReducer = (acc, cur) => {
          console.log('acc: ', acc, 'cur: ', cur)
          const match = acc.findIndex(
            (item) =>
              item.slug === cur.slug &&
              JSON.stringify(item.subchoices) === JSON.stringify(cur.subchoices),
          );
          console.log('match: ', match);
          if (match >= 0) {
            const prev = acc[match];
            acc[match] = { ...prev, amount: prev.amount + 1 };
          } else {
            acc = acc.concat({ ...cur, id_for_stock: new Date().valueOf() });
          }
          console.log('acc result: ', acc);
          return acc;
        };
        (function() {
          const existingCart = JSON.parse(sessionStorage.getItem('${ssKey}') || '{}');
          const restaurant_id = Number(${this.shopId});
          const isSameOrigin = existingCart.restaurant_id === restaurant_id;
          const restaurant = ${JSON.stringify(this.shopInfo)};
          const restaurant_name = restaurant.name;
          const items = (isSameOrigin ? existingCart.items : []).concat(${JSON.stringify(
            this.data
          )}).reduce(cartItemReducer, []);
          const result = {
            restaurant_id,
            restaurant,
            restaurant_name,
            checkout_address: ${JSON.stringify(this.address)},
            items,
            default_price: 0,
          };
          sessionStorage.setItem('${ssKey}', JSON.stringify(result));
          window.location.reload();
        })()`;
    }
  }

  copied(e: any) {
    alert(
      '클립보드 복사에 성공했어요.\n자바스크립트 호환성을 위해 크롬 브라우저를 사용해주세요.'
    );
  }
}

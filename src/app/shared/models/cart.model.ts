// Generated by https://quicktype.io

import { Restaurant } from 'src/app/shop/models/shop-info.model';
import { MenuSubchoiceGroupCart } from 'src/app/shop/models/shop-menu.model';

export interface UserCart {
  restaurant_id: number | null;
  /** 주문한 음식 */
  items: CartItem[];
}
export interface Cart extends UserCart {
  /** 주문한 가게의 기본 정보 */
  restaurant: Restaurant;
  /** UI 표시용인듯.. */
  restaurant_name: Restaurant['name'];
  default_price: number;
  /** 배달 주소 */
  checkout_address: CheckoutAddress;
  stock_amount_dictionary?: {};
}

export interface CheckoutAddress {
  address: string; // 서울특별시 강남구 역삼동 826-28 송민빌딩
  zipcode: string; // 135081
}

export interface CartItem {
  slug: string;
  /** 옵션을 다 합친 금액 */
  price: number;
  /** 메뉴의 기본 가격 */
  base_price: number;
  default_price: number;
  /** 메뉴 이름 */
  name: string;
  /** 메뉴 숫자 */
  id: number;
  /** 메뉴의 갯수 */
  amount: number;
  /** 추가 선택 옵션 */
  subchoices: { [slug: string]: MenuSubchoiceGroupCart };
  id_for_stock?: number;
}

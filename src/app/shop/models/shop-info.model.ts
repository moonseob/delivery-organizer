// Generated by https://quicktype.io

export interface Restaurant {
  slug: string;
  /** 가게 이름 */
  name: string;
  /** 프랜차이즈? */
  franchise_id: null;
  franchise_name: null;
  /** 목록 화면에 나오는 300x300 이미지 */
  logo_url: string;
  /** 현재 주문 가능 여부 */
  is_available_delivery: boolean;
  /** 예상 배달 소요 시간 */
  estimated_delivery_time: string;
  /** 음식 사진 큰 이미지 */
  background_url: string;
  rating: number;
  free_delivery_threshold: number;
  detail_image_urls: any[];
  subtitle: string;
  floating_message: string;
  has_liquor_section: boolean;
  stock_management: boolean;
  use_reusable_packaging: boolean;
  additional_discount_pickup_per_menu: number;
  delivery_fee: number;
  adjusted_delivery_fee: number;
  dine_in: boolean;
  app_order: boolean;
  discounted_delivery_fee: number;
  lng: number;
  restaurant_type: string;
  open: boolean;
  id: number;
  can_review: number;
  hygiene_grade: null;
  city: string;
  delivery_fee_notice: {
    by_price: ShopDeliveryFeeByPrice[];
  };
  review_count: number;
  discount_from: null;
  open_time_description: string;
  tags: any[];
  delivery_fee_explanation: null;
  history_message: string;
  reachable: boolean;
  additional_discount: number;
  new: boolean;
  has_disposable_menu: boolean;
  review_image_count: number;
  central_billing: boolean;
  is_available_pickup: boolean;
  description: string;
  unorderable_under_min_order_value: boolean;
  is_open_all_day: boolean;
  additional_discount_per_menu: number;
  opening_times: any[];
  additional_discount_pickup: number;
  phone: string;
  phone_order: boolean;
  has_terminal: boolean;
  lat: number;
  end: string;
  discount_until: null;
  categories: string[];
  review_avg: number;
  min_order_amount: number;
  distance: number;
  thumbnail_message: string;
  except_cash: boolean;
  url: string;
  has_flyers: boolean;
  minimum_pickup_minutes: number;
  payment_methods: string[];
  delivery_method: string;
  owner_reply_count: number;
  discount_percent: number;
  begin: string;
  delivery_fee_to_display: DevlieryFeeDisplay;
  open_all_day_until: string;
  address: string;
}
export interface ShopDeliveryFeeByPrice {
  to: string;
  amount: number;
  from: string;
  display: DevlieryFeeDisplay;
}

export interface DevlieryFeeDisplay {
  basic: string;
}

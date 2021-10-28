import { User } from 'src/app/shared/models/user.model';

export interface ShopStats {
  /** 주문 마감 시각, ISO timestamp */
  due: string;
  /** 해당 메뉴를 주문한 유저들의 목록 */
  ordered_users: User[] | string[];
}

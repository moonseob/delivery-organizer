import { UserCart } from './cart.model';

export interface Order extends UserCart {
  uid: string;
  date: string;
  id: string; // orderId: `randomUUID()`
}

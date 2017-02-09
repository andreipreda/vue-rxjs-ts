import { ordersTable } from './views';
import { orders$, IOrder } from './mechanism';

// inserting orders in vue view
orders$.subscribe(
                         // workaround for vuejs lack of direct typescript support
  (orders: IOrder[])  => (ordersTable as any).orders = orders
);

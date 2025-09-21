
import type { Product } from './products';
import type { User } from './users';

export interface Order {
  id: string;
  user: User;
  products: Product[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: Date;
}

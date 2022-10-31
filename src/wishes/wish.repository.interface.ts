import { WishModel } from '@prisma/client';
import { Wish } from './wish.entity';

export interface IWishRepository {
	getAllWishes: (userId: number) => Promise<WishModel[]>;
	create: (wish: Wish) => Promise<WishModel>;
	remove: (wish: number) => Promise<boolean>;
}

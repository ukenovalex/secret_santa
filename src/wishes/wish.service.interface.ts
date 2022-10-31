import { WishModel } from '@prisma/client';
import { WishRemoveDto } from './dto/wish-remove.dto';
import { WishSaveDto } from './dto/wish-save.dto';

export interface IWishService {
	getWishList: (email: string) => Promise<WishModel[]>;
	createWish: (wish: WishSaveDto, email: string) => Promise<WishModel>;
	removeWish: (wishId: number) => Promise<boolean>;
}

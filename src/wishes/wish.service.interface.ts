import { WishModel } from '@prisma/client';
import { WishRemoveDto } from './dto/wish-remove.dto';
import { WishSaveDto } from './dto/wish-save.dto';

export interface IWishService {
	getWishList: (email: string) => Promise<WishModel[]>;
	setWish: (wish: WishSaveDto) => Promise<boolean>;
	removeWish: (wish: WishRemoveDto) => Promise<boolean>;
}

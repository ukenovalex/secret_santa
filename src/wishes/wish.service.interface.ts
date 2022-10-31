import { WishModel } from '@prisma/client';
import { WishSaveDto } from './dto/wish-save.dto';

export interface IWishService {
	createWish: (wish: WishSaveDto, email: string) => Promise<WishModel>;
	removeWish: (wishId: number) => Promise<boolean>;
}

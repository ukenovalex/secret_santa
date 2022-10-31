import { injectable } from 'inversify';
import { WishRemoveDto } from './dto/wish-remove.dto';
import { WishSaveDto } from './dto/wish-save.dto';
import { IWishService } from './wish.service.interface';

@injectable()
export class WishService implements IWishService {
	async getWishList(email: string) {
		return [];
	}
	async setWish(wish: WishSaveDto) {
		return true;
	}
	async removeWish(wish: WishRemoveDto) {
		return true;
	}
}

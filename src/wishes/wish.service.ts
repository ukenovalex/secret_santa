import { WishModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { IUserService } from '../users/user.service.interface';
import { WishRemoveDto } from './dto/wish-remove.dto';
import { WishSaveDto } from './dto/wish-save.dto';
import { Wish } from './wish.entity';
import { IWishRepository } from './wish.repository.interface';
import { IWishService } from './wish.service.interface';

@injectable()
export class WishService implements IWishService {
	constructor(
		@inject(TYPES.WishRepository) private wishRepository: IWishRepository,
		@inject(TYPES.IUserService) private userService: IUserService,
	) {}
	async getWishList(email: string): Promise<WishModel[]> {
		const user = await this.userService.getUserInfo(email);
		if (user) {
			return await this.wishRepository.getAllWishes(user?.id);
		} else {
			throw new HTTPError(422, 'User Not Found');
		}
	}
	async createWish(wish: WishSaveDto, email: string): Promise<WishModel> {
		const user = await this.userService.getUserInfo(email);
		if (user) {
			const newWish = new Wish(wish.message, user?.id);
			const createdWish = await this.wishRepository.create(newWish);
			return createdWish;
		} else {
			throw new HTTPError(422, 'User Not Found');
		}
	}
	async removeWish(wishId: number): Promise<boolean> {
		return await this.wishRepository.remove(wishId);
	}
}

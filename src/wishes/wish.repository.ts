import { WishModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from '../database/prisma.service.interface';
import { TYPES } from '../types';
import { Wish } from './wish.entity';
import { IWishRepository } from './wish.repository.interface';

@injectable()
export class WishRepository implements IWishRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: IPrismaService) {}

	async getAllWishes(userId: number): Promise<WishModel[]> {
		const wishes = await this.prismaService.client.wishModel.findMany({
			where: {
				authorId: userId,
			},
		});
		return wishes;
	}
	async create(wish: Wish): Promise<WishModel> {
		const createdWish = await this.prismaService.client.wishModel.create({
			data: {
				message: wish.message,
				authorId: wish.authorId,
			},
		});
		return createdWish;
	}
	async remove(wishId: number): Promise<boolean> {
		try {
			await this.prismaService.client.wishModel.delete({
				where: {
					id: wishId,
				},
			});
			return true;
		} catch {
			return false;
		}
	}
}

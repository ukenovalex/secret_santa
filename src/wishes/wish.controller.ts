import { NextFunction, Response, Request, Router } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../common/auth.guard';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { WishRemoveDto } from './dto/wish-remove.dto';
import { WishSaveDto } from './dto/wish-save.dto';
import IWishController from './wish.controller.interface';
import { IWishService } from './wish.service.interface';

@injectable()
export class WishController extends BaseController implements IWishController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IWishService) private wishService: IWishService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/wish',
				method: 'get',
				func: this.getWishList,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/wish',
				method: 'put',
				func: this.setWish,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/wish',
				method: 'delete',
				func: this.removeWish,
				middlewares: [new AuthGuard()],
			},
		]);
	}
	async getWishList({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const wishList = await this.wishService.getWishList(user);
		this.ok(res, { wishList });
	}
	async setWish(
		{ body }: Request<{}, {}, WishSaveDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.wishService.setWish(body);
		if (!result) {
			this.loggerService.error('Set Wish Is Error');
			return next(new HTTPError(400, 'Set Wish Is Error'));
		}
		this.send(res, 201, `Wish ${body.message} saved to ${body.user_id}`);
	}
	async removeWish(
		{ body }: Request<{}, {}, WishRemoveDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.wishService.removeWish(body);
		if (!result) {
			this.loggerService.error('Remove Wish Is Error');
			return next(new HTTPError(400, 'Remove Wish Is Error'));
		}
		this.send(res, 201, `Wish ${body.id} removed`);
	}
	getRouter(): Router {
		return this.router;
	}
}

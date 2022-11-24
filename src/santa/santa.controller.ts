import { Request, Response, NextFunction, Router } from 'express';
import { inject, injectable } from 'inversify';
import { AuthGuard } from '../common/auth.guard';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import ISantaController from './santa.controller.interface';
import { ISantaService } from './santa.service.interface';

@injectable()
export class SantaController extends BaseController implements ISantaController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ISantaService) private santaService: ISantaService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/santa/become',
				method: 'post',
				func: this.becomeSanta,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/santa/donee',
				method: 'get',
				func: this.getDonee,
				middlewares: [new AuthGuard()],
			},
		]);
	}
	async becomeSanta({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.santaService.becomeSanta(user);
			if (!result) {
				const message = 'У санты сдохли олени. Обратитесь к Алексею У. он их похоронит';
				this.loggerService.error(message);
				return next(new HTTPError(400, message));
			}
			this.send(res, 201, {
				name: result.name,
				wishes: result.wishes,
			});
		} catch (e: any | HTTPError) {
			return next(new HTTPError(422, e.message));
		}
	}

	async getDonee({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const result = await this.santaService.getDonee(user);
			if (!result) {
				const message = 'С вашим одаряемым что то не то';
				this.loggerService.error(message);
				return next(new HTTPError(400, message));
			}
			this.ok(res, {
				name: result.name,
				wishes: result.wishes,
			});
		} catch (e: any | HTTPError) {
			return next(new HTTPError(422, 'Не ври! Ты не санта!'));
		}
	}

	getRouter(): Router {
		return this.router;
	}
}

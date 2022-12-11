import { NextFunction, Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import IUserController from './user.controller.interface';
import 'reflect-metadata';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IUserService } from './user.service.interface';
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { AuthGuard } from '../common/auth.guard';
import { IWishService } from '../wishes/wish.service.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/user/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/user/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/user/info',
				method: 'get',
				func: this.info,
				middlewares: [new AuthGuard()],
			},
			{
				path: '/user/all',
				method: 'get',
				func: this.getAllUsers,
				middlewares: [new AuthGuard()],
			},
		]);
	}

	getRouter(): Router {
		return this.router;
	}

	async login(
		{ body }: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(body);
		if (!result) {
			this.loggerService.error('Invalid login');
			return next(new HTTPError(401, 'Ligin is invalid'));
		}
		const jwt = await this.signJWT(body.email, this.configService.get('SECRET'));
		this.ok(res, { jwt });
		this.loggerService.log('Login');
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.createUser(body);
		if (!result) {
			return next(new HTTPError(422, 'This user is exists'));
		}
		this.send(res, 201, { data: result });
	}

	async info({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const foundedUser = await this.userService.getUserInfo(user);
		if (!foundedUser) {
			next('User Not Found');
			return;
		}

		this.ok(res, {
			id: foundedUser?.id,
			email: foundedUser?.email,
			name: foundedUser?.name,
			image: foundedUser?.image,
			isSanta: foundedUser?.isSanta,
			wishes: foundedUser.wishes,
		});
	}

	async getAllUsers({ user }: Request, res: Response, next: NextFunction): Promise<void> {
		const userList = await this.userService.getAllUsers(user);
		if (userList.length > 0) {
			this.ok(res, userList);
		} else {
			return next(new HTTPError(400, 'User list is empty'));
		}
	}

	private signJWT(email: string, secret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{ algorithm: 'HS256' },
				(err, token) => {
					if (err) {
						reject(err);
					} else {
						resolve(token as string);
					}
				},
			);
		});
	}
}

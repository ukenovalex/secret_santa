import { UserModel, WishModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserRepository } from './user.repository.interface';
import { IUserService } from './user.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private userRepository: IUserRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			if (!existedUser.password) {
				const salt = this.configService.get('SALT');
				await newUser.setPassword(password, Number(salt));
				return await this.userRepository.update(newUser);
			}
			return null;
		}
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return await this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (existedUser && existedUser.password) {
			const user = new User(existedUser.email, existedUser.name, existedUser.password);
			return await user.comparePassword(password);
		}
		return false;
	}

	async getUserInfo(email: string): Promise<(UserModel & { wishes: WishModel[] }) | null> {
		return this.userRepository.find(email);
	}
}

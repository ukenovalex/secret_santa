import { UserModel } from '@prisma/client';
import { compare } from 'bcryptjs';
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
		const newUser = new User(email, name, false);
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			return null;
		}
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		return this.userRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.userRepository.find(email);
		if (existedUser) {
			const user = new User(existedUser.email, existedUser.name, existedUser.isSanta, existedUser.password);
			return await user.comparePassword(password);
		}
		return false;
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.userRepository.find(email);
	}
}

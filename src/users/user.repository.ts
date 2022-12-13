import { Prisma, UserModel, WishModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from '../database/prisma.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { User as UserResponseModel } from './models/user.model';
import { IUserRepository } from './user.repository.interface';

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: IPrismaService) {}
	async create({ email, password, name }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.create({
			data: {
				email,
				password,
				name,
			},
		});
	}
	async update({ email, password, name }: User): Promise<UserModel> {
		return await this.prismaService.client.userModel.update({
			where: {
				email,
			},
			data: {
				password,
				name,
			},
		});
	}

	async find(email: string): Promise<(UserModel & { wishes: WishModel[] }) | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				email,
			},
			include: { wishes: true },
		});
	}

	async findAll(email: string): Promise<UserResponseModel[]> {
		const users = await this.prismaService.client.userModel.findMany({
			orderBy: {
				name: 'desc',
			},
			where: {
				email: {
					not: email,
				},
			},
		});
		return users.map((user) => ({ name: user.name, isSanta: user.isSanta }));
	}
}

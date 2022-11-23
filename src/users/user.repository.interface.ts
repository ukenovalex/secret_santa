import { UserModel, WishModel } from '@prisma/client';
import { User } from './user.entity';

export interface IUserRepository {
	create: (user: User) => Promise<UserModel>;
	update: (user: User) => Promise<UserModel>;
	find: (email: string) => Promise<(UserModel & { wishes: WishModel[] }) | null>;
}

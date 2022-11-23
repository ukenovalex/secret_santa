import { UserModel, WishModel } from '@prisma/client';

export interface ISantaRepository {
	getRandomPerson: (
		email: string,
		userID: number,
	) => Promise<(UserModel & { wishes: WishModel[] }) | null>;
	getMyDonee: (doneeID: number) => Promise<(UserModel & { wishes: WishModel[] }) | null>;
}

import { inject, injectable } from 'inversify';
import { HTTPError } from '../errors/http-error.class';
import { TYPES } from '../types';
import { IUserService } from '../users/user.service.interface';
import { Donee } from './donee.entity';
import { ISantaRepository } from './santa.repository.interface';
import { ISantaService } from './santa.service.interface';

@injectable()
export class SantaService implements ISantaService {
	constructor(
		@inject(TYPES.IUserService) private userService: IUserService,
		@inject(TYPES.ISantaRepository) private santaRepository: ISantaRepository,
	) {}

	async becomeSanta(email: string): Promise<Donee> {
		const user = await this.userService.getUserInfo(email);
		if (user) {
			if (user.isSanta) {
				throw new HTTPError(500, 'У тебя че много денег на подарки?');
			}
			const randomUser = await this.santaRepository.getRandomPerson(email, user.id);
			if (!randomUser) {
				throw new HTTPError(500, 'Donee Not Found');
			}
			return await new Donee(
				randomUser.name,
				randomUser.wishes.map((wish) => wish.message),
			);
		} else {
			throw new HTTPError(500, 'User Not Found');
		}
	}
	async getDonee(email: string): Promise<Donee> {
		const user = await this.userService.getUserInfo(email);
		if (user && user.donee_id) {
			const myDonee = await this.santaRepository.getMyDonee(user.donee_id);
			if (myDonee) {
				return await new Donee(
					myDonee.name,
					myDonee.wishes.map((wish) => wish.message),
				);
			} else {
				throw new HTTPError(500, 'Donee Not Found');
			}
		} else {
			throw new HTTPError(500, 'User || Donee Not Found');
		}
	}
}

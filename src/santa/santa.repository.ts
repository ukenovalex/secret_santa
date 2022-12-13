import { UserModel, WishModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { IPrismaService } from '../database/prisma.service.interface';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { ISantaRepository } from './santa.repository.interface';

@injectable()
export class SantaRepository implements ISantaRepository {
	constructor(
		@inject(TYPES.PrismaService) private prismaService: IPrismaService,
		@inject(TYPES.ILogger) private logger: ILogger,
	) {}

	async getRandomPerson(
		email: string,
		id: number,
	): Promise<(UserModel & { wishes: WishModel[] }) | null> {
		const firstPriority = await this.prismaService.client.userModel.findMany({
			where: {
				email: {
					not: email,
				},
				isHasSanta: false,
				isSanta: false,
			},
			include: { wishes: true },
		});
		// this.logger.log('firstPriority');
		// this.logger.log(firstPriority);
		const firstPriorityRandom = firstPriority[this.getRandomInt(firstPriority.length)];
		if (firstPriorityRandom) {
			await this.updateDoneeId(id, firstPriorityRandom.id);
			return firstPriorityRandom;
		}
		const secondPriority = await this.prismaService.client.userModel.findMany({
			where: {
				email: {
					not: email,
				},
				donee_id: {
					not: id,
				},
				isHasSanta: false,
			},
			include: { wishes: true },
		});
		// this.logger.log('secondPriority');
		// this.logger.log(secondPriority);
		const secondPriorityRandom = secondPriority[this.getRandomInt(secondPriority.length)];
		if (secondPriorityRandom) {
			await this.updateDoneeId(id, secondPriorityRandom.id);
			return secondPriorityRandom;
		}

		const thirdPriority = await this.prismaService.client.userModel.findMany({
			where: {
				email: {
					not: email,
				},
				isHasSanta: false,
			},
			include: { wishes: true },
		});
		// this.logger.log('thirdPriority');
		// this.logger.log(thirdPriority);
		const thirdPriorityRandom = secondPriority[this.getRandomInt(thirdPriority.length)];
		if (thirdPriorityRandom) {
			await this.updateDoneeId(id, thirdPriorityRandom.id);
			return thirdPriorityRandom;
		} else {
			throw new HTTPError(500, 'нет человечков для одарения');
		}
	}

	async getMyDonee(doneeID: number): Promise<(UserModel & { wishes: WishModel[] }) | null> {
		return await this.prismaService.client.userModel.findFirst({
			where: {
				id: doneeID,
			},
			include: { wishes: true },
		});
	}

	private async updateDoneeId(userID: number, doneID: number): Promise<void> {
		await this.prismaService.client.userModel.update({
			where: {
				id: userID,
			},
			data: {
				donee_id: doneID,
				isSanta: true,
			},
		});
		await this.prismaService.client.userModel.update({
			where: {
				id: doneID,
			},
			data: {
				isHasSanta: true,
			},
		});
	}

	private getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}

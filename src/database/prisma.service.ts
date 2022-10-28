import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IPrismaService } from './prisma.service.interface';

@injectable()
export class PrismaService implements IPrismaService {
	private _client: PrismaClient;

	constructor(@inject(TYPES.ILogger) private logger: ILogger) {
		this._client = new PrismaClient();
	}

	get client(): PrismaClient {
		return this._client;
	}

	async connect(): Promise<void> {
		try {
			await this._client.$connect();
			this.logger.log('[PrismaService] DB is connection');
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error('[PrismaService] DB connect with error');
			}
		}
	}

	async disconnect(): Promise<void> {
		await this._client.$disconnect();
	}
}

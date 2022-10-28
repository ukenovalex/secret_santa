import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { IExceptionFilter } from './exception.filter.interface';
import { HTTPError } from './http-error.class';
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): Response {
		if (err instanceof HTTPError) {
			this.logger.error(`[${err.context} | ${err.statusCode}] : ${err.message}`);
			return res.status(err.statusCode).send({ error: err.message });
		} else {
			this.logger.error(err.message);
			return res.status(500).send('Server Error!');
		}
	}
}

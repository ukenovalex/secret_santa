import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface';
import 'reflect-metadata';

@injectable()
export class LoggerService implements ILogger {
	private logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
			displayFunctionName: false,
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
}

import { NextFunction, Request, Response } from 'express';
import { HTTPError } from './http-error.class';

export interface IExceptionFilter {
	catch: (err: Error | HTTPError, req: Request, res: Response, next: NextFunction) => void;
}

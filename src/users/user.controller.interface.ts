import { NextFunction, Request, Response, Router } from 'express';

export default interface IUserController {
	login: (req: Request, res: Response, next: NextFunction) => void;
	register: (req: Request, res: Response, next: NextFunction) => void;
	getRouter: () => Router;
	info: (req: Request, res: Response, next: NextFunction) => void;
}

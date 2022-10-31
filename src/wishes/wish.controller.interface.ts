import { NextFunction, Router, Request, Response } from 'express';

export default interface IWishController {
	getWishList: (req: Request, res: Response, next: NextFunction) => void;
	createWish: (req: Request, res: Response, next: NextFunction) => void;
	removeWish: (req: Request, res: Response, next: NextFunction) => void;
	getRouter: () => Router;
}

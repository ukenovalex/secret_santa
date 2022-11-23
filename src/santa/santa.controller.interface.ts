import { NextFunction, Request, Response, Router } from 'express';

export default interface ISantaController {
	becomeSanta: (req: Request, res: Response, next: NextFunction) => void;
	getDonee: (req: Request, res: Response, next: NextFunction) => void;
	getRouter: () => Router;
}

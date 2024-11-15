import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserController, IUserService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { NotFoundException } from '../exceptions';

@injectable()
export class UserController implements IUserController {
   private readonly userService: IUserService;
   constructor(@inject(IOC_TYPES.UserService) userService: IUserService) {
      this.userService = userService;
   }
   getMyself = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const userID = req.userID!;
         const user = await this.userService.findOne({ id: userID });
         if (!user) {
            throw new NotFoundException();
         }
         res.json(user);
      } catch (error) {
         next(error);
      }
   };
}

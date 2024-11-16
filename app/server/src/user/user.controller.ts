import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserController, IUserService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { NotFoundException } from '../exceptions';
import { plainToInstance } from 'class-transformer';
import { PatchUserDTO } from './user.dto';

@injectable()
export class UserController implements IUserController {
   private readonly userService: IUserService;
   constructor(@inject(IOC_TYPES.UserService) userService: IUserService) {
      this.userService = userService;
   }
   getMyself = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const user = await this.userService.findOne({ id: req.userID! });
         if (!user) {
            throw new NotFoundException();
         }
         res.json(user);
      } catch (error) {
         next(error);
      }
   };

   patch = async (req: Request, res: Response, next: NextFunction) => {
      try {
         const patchDTO = plainToInstance(PatchUserDTO, req.body as unknown, { exposeUnsetFields: false });
         const user = await this.userService.patch(req.userID!, +req.params['userID'], patchDTO);
         res.json(user);
      } catch (error) {
         next(error);
      }
   };
}

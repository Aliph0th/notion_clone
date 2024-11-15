import { Container } from 'inversify';
import { AuthController } from '../auth/auth.controller';
import {
   IAuthController,
   IAuthService,
   IConfigService,
   ITokenService,
   IUserController,
   IUserService
} from '../interfaces';
import { TokenService } from '../token/token.service';
import { IOC_TYPES } from './types';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../config/config.service';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';

const IOC_CONTAINER = new Container();

IOC_CONTAINER.bind<ITokenService>(IOC_TYPES.TokenService).to(TokenService);
IOC_CONTAINER.bind<IAuthService>(IOC_TYPES.AuthService).to(AuthService);
IOC_CONTAINER.bind<IConfigService>(IOC_TYPES.ConfigService).to(ConfigService);
IOC_CONTAINER.bind<IUserService>(IOC_TYPES.UserService).to(UserService);
IOC_CONTAINER.bind<IAuthController>(IOC_TYPES.AuthController).to(AuthController);
IOC_CONTAINER.bind<IUserController>(IOC_TYPES.AuthController).to(UserController);

export default IOC_CONTAINER;

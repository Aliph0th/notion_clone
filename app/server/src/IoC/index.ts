import { Container } from 'inversify';
import { AuthController } from '../auth/auth.controller';
import { IAUthController, IAuthService, ITokenService } from '../interfaces';
import { TokenService } from '../token/token.service';
import { IOC_TYPES } from './types';
import { AuthService } from '../auth/auth.service';
import { IConfigService } from '../interfaces/config.interface';
import { ConfigService } from '../config/config.service';

const IOC_CONTAINER = new Container();

IOC_CONTAINER.bind<ITokenService>(IOC_TYPES.TokenService).to(TokenService);
IOC_CONTAINER.bind<IAuthService>(IOC_TYPES.AuthService).to(AuthService);
IOC_CONTAINER.bind<IConfigService>(IOC_TYPES.ConfigService).to(ConfigService);
IOC_CONTAINER.bind<IAUthController>(IOC_TYPES.AuthController).to(AuthController);

export default IOC_CONTAINER;

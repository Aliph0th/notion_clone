import { Container } from 'inversify';
import { AuthController } from '../auth/auth.controller';
import { IAUthController, ITokenService } from '../interfaces';
import { TokenService } from '../token/token.service';
import { IOC_TYPES } from './types';

const IOC_CONTAINER = new Container();

IOC_CONTAINER.bind<ITokenService>(IOC_TYPES.TokenService).to(TokenService);
IOC_CONTAINER.bind<IAUthController>(IOC_TYPES.AuthController).to(AuthController);

export default IOC_CONTAINER;

import cors from 'cors';
import IOC_CONTAINER from '../IoC';
import { IOC_TYPES } from '../IoC/types';

import { IConfigService } from '../interfaces';

const configService = IOC_CONTAINER.get<IConfigService>(IOC_TYPES.ConfigService);

export const corsMiddleware = cors({ credentials: true, origin: configService.getOrThrow('ORIGIN') });

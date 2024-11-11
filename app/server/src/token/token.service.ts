import { injectable } from 'inversify';
import 'reflect-metadata';
import { ITokenService } from '../interfaces';

@injectable()
export class TokenService implements ITokenService {
   generate = () => {};
}

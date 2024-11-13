import { inject, injectable } from 'inversify';
import { IAuthService, ITokenService, IUserService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { RegisterDTO } from './auth.dto';
import { ConflictException } from '../exceptions';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants';
import { plainToInstance } from 'class-transformer';
import { ResponseUserDTO } from '../user/user.dto';

@injectable()
export class AuthService implements IAuthService {
   private readonly tokenService: ITokenService;
   private readonly userService: IUserService;
   constructor(
      @inject(IOC_TYPES.TokenService) tokenService: ITokenService,
      @inject(IOC_TYPES.UserService) userService: IUserService
   ) {
      this.tokenService = tokenService;
      this.userService = userService;
   }
   async register(dto: RegisterDTO) {
      const candidate = await this.userService.findOne({ email: dto.email });
      if (candidate) {
         throw new ConflictException('Such user already exists');
      }
      const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
      const createdUser = await this.userService.create({ ...dto, password: hashedPassword });
      const tokens = this.tokenService.generateTokens({ id: createdUser.id });

      return { tokens, user: plainToInstance(ResponseUserDTO, createdUser, { exposeUnsetFields: false }) };
   }
}

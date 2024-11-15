import bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { inject, injectable } from 'inversify';
import { SALT_ROUNDS } from '../constants';
import { BadRequestException, ConflictException, UnauthorizedException } from '../exceptions';
import { IAuthService, ITokenService, IUserService } from '../interfaces';
import { IOC_TYPES } from '../IoC/types';
import { ResponseUserDTO } from '../user/user.dto';
import { LoginDTO, RegisterDTO } from './auth.dto';

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
   register = async (dto: RegisterDTO) => {
      const candidate = await this.userService.findOne({ email: dto.email });
      if (candidate) {
         throw new ConflictException('Such user already exists');
      }
      const hashedPassword = await bcrypt.hash(dto.password, SALT_ROUNDS);
      const createdUser = await this.userService.create({ ...dto, password: hashedPassword });
      const tokens = this.tokenService.generateTokens({ id: createdUser.id });
      await this.tokenService.upsert(createdUser.id, tokens.refreshToken);

      return { tokens, user: plainToInstance(ResponseUserDTO, createdUser, { exposeUnsetFields: false }) };
   };

   login = async (dto: LoginDTO) => {
      const user = await this.userService.findOne({ email: dto.email });
      if (!user) {
         throw new BadRequestException({ message: 'Email or password is incorrect' });
      }
      const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);
      if (!isPasswordCorrect) {
         throw new BadRequestException({ message: 'Email or password is incorrect' });
      }
      const tokens = this.tokenService.generateTokens({ id: user.id });
      await this.tokenService.upsert(user.id, tokens.refreshToken);

      return { tokens, user: plainToInstance(ResponseUserDTO, user, { exposeUnsetFields: false }) };
   };

   refresh = async (token: string) => {
      if (!token) {
         throw new UnauthorizedException();
      }
      const validatedToken = this.tokenService.validateRefreshToken(token);
      if (!validatedToken) {
         throw new UnauthorizedException();
      }
      const databaseToken = await this.tokenService.findOne({ userID: validatedToken.id, token });
      if (!databaseToken) {
         throw new UnauthorizedException();
      }

      const tokens = this.tokenService.generateTokens({ id: databaseToken.id });
      await this.tokenService.upsert(databaseToken.id, tokens.refreshToken);

      return { tokens };
   };
}

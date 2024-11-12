import { config, DotenvParseOutput } from 'dotenv';
import { injectable } from 'inversify';
import { IConfigService } from '../interfaces/config.interface';

@injectable()
export class ConfigService implements IConfigService {
   private readonly config: DotenvParseOutput;
   constructor() {
      const { parsed, error } = config();
      if (error || !parsed) {
         throw new Error(`Cannot initialize ${ConfigService.name}`);
      }
      this.config = parsed;
   }

   getOrThrow(key: string) {
      const value = this.config[key];
      if (!value) {
         throw new Error(`Cannot find key ${key} in config`);
      }
      return value;
   }
}

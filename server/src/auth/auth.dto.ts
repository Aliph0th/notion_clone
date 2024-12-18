import { Exclude, Expose, Transform } from 'class-transformer';

export class RegisterDTO {
   @Expose()
   email!: string;
   @Expose()
   password!: string;

   @Exclude()
   repeatedPassword?: undefined;

   @Expose()
   username?: string;
   @Expose()
   age?: number;

   @Expose()
   @Transform(({ obj }) => obj.gravatarEmail || obj.email)
   gravatarEmail!: string;

   constructor(partial: Partial<RegisterDTO>) {
      Object.assign(this, partial);
   }
}

export class LoginDTO {
   @Expose()
   email!: string;
   @Expose()
   password!: string;

   constructor(partial: Partial<RegisterDTO>) {
      Object.assign(this, partial);
   }
}

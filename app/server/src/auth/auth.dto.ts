import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class RegisterDTO {
   @Expose()
   email!: string;
   @Expose()
   password!: string;

   @Exclude()
   repeatedPassword!: string;

   @Expose()
   username?: string;
   @Expose()
   age?: number;

   @Expose()
   @Transform(({ obj }) => obj.gravatar_email || obj.email)
   gravatar_email!: string;

   constructor(partial: Partial<RegisterDTO>) {
      Object.assign(this, partial);
   }
}

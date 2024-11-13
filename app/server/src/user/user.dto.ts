import { Exclude, Expose } from 'class-transformer';

export class ResponseUserDTO {
   @Expose()
   id!: number;
   @Expose()
   email!: string;

   @Exclude()
   password!: string;

   @Expose()
   username?: string;
   @Expose()
   age?: number;
   @Expose()
   gravatarEmail!: string;
   @Expose()
   registrationDate!: Date;

   constructor(partial: Partial<ResponseUserDTO>) {
      Object.assign(this, partial);
   }
}

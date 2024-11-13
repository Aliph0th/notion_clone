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
   gravatar_email!: string;
   @Expose()
   registration_date!: Date;

   constructor(partial: Partial<ResponseUserDTO>) {
      Object.assign(this, partial);
   }
}

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

export class PatchUserDTO {
   @Expose()
   username?: string;
   @Expose()
   age?: number;
   @Expose()
   gravatarEmail?: string;

   constructor(partial: Partial<PatchUserDTO>) {
      Object.assign(this, partial);
   }
}

export class UpdatePasswordDTO {
   @Expose()
   currentPassword!: string;
   @Expose()
   password!: string;
   @Exclude()
   repeatedPassword!: string;

   constructor(partial: Partial<UpdatePasswordDTO>) {
      Object.assign(this, partial);
   }
}

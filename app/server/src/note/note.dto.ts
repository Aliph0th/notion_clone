import { Expose } from 'class-transformer';

export class CreateNoteDTO {
   @Expose()
   name!: string;
   @Expose()
   content!: string;

   constructor(partial: Partial<CreateNoteDTO>) {
      Object.assign(this, partial);
   }
}

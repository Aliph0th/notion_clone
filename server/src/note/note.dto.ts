import { Expose } from 'class-transformer';

export class CreatePatchNoteDTO {
   @Expose()
   name?: string;
   @Expose()
   content?: string;

   constructor(partial: Partial<CreatePatchNoteDTO>) {
      Object.assign(this, partial);
   }
}

import { Request, Response } from 'express';
export interface IAUthController {
   register: (req: Request, res: Response) => void;
}

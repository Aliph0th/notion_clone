import { body } from 'express-validator';

export const noteCreateValidators = [
   body('name')
      .trim()
      .isLength({ min: 1, max: 256 })
      .withMessage('Name of the note must consist of at least 1 character and be no longer than 256'),
   body('content')
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Content of the note must consist of at least 1 character and be no longer than 256')
];

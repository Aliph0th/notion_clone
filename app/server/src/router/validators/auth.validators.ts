import { body } from 'express-validator';

export const authRegisterValidators = [
   body('email').isEmail().withMessage('The email address must be entered correctly'),
   body('password')
      .isLength({ min: 8 })
      .withMessage("Password's length must be at least 8 characters")
      .bail({ level: 'chain' })
      .custom(value => {
         if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/\d/.test(value)) {
            throw Error('Password must contain at least one capital letter, lowercase letter and digit');
         }
         return true;
      }),
   body('repeatedPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
         throw new Error("Passwords don't match");
      }
      return true;
   }),
   body('username')
      .optional()
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Username must be a string from 1 to 20 characters long'),
   body('age').optional().isInt({ gt: 0 }).withMessage('Age must be an integer greater than 0'),
   body('gravatarEmail').optional().isEmail().withMessage('The gravatar email address must be entered correctly')
];

export const authLoginValidators = [
   body('email').isEmail().withMessage('The email address must be entered correctly'),
   body('password').isLength({ min: 8 }).withMessage("Password's length must be at least 8 characters")
];

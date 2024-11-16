import { body } from 'express-validator';

export const patchUserValidators = [
   body('username')
      .optional()
      .trim()
      .isLength({ min: 1, max: 20 })
      .withMessage('Username must be a string from 1 to 20 characters'),
   body('age').optional().isInt({ gt: 0 }).withMessage('Age must be an integer greater than 0'),
   body('gravatarEmail').optional().isEmail().withMessage('The gravatar email address must be entered correctly'),
   body().custom((_, { req }) => {
      if (!req.body.username && !req.body.age && !req.body.gravatarEmail) {
         throw new Error('At least one of fields username, age or gravatarEmail must be provided');
      }
      return true;
   })
];

export const updatePasswordValidators = [
   body('currentPassword').isLength({ min: 8 }).withMessage("Password's length must be at least 8 characters"),
   body('password')
      .isLength({ min: 8 })
      .withMessage("Password's length must be at least 8 characters")
      .bail({ level: 'chain' })
      .custom(value => {
         if (![/[A-Z]/, /[a-z]/, /\d/].every(regex => regex.test(value))) {
            throw Error('Password must contain at least one capital letter, lowercase letter and digit');
         }
         return true;
      }),
   body('repeatedPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
         throw new Error("Passwords don't match");
      }
      return true;
   })
];

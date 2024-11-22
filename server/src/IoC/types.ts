export const IOC_TYPES = {
   AuthController: Symbol.for('auth-controller'),
   UserController: Symbol.for('user-controller'),
   NoteController: Symbol.for('note-controller'),
   AuthService: Symbol.for('auth-service'),
   TokenService: Symbol.for('token-service'),
   ConfigService: Symbol.for('config-service'),
   UserService: Symbol.for('user-service'),
   NoteService: Symbol.for('note-service')
};

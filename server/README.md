## Backend

Global prefix `/api/` is used.

Backend provides following endpoints:

### Auth

-  `POST /auth/register` - registers new user

   #### Accepts following body:

   -  `email: string` - user's email
   -  `password: string` - password must be >= 8 characters long and contain at least one digit, capital and lowercase letters
   -  `repeatedPassword: string` - must match the password field
   -  (optional) `username: string` - user's username (from 1 to 20 characters)
   -  (optional) `age: Number` - integer greater than 0
   -  (optional) `gravatarEmail: string` - email that will be used for user's avatar. User's email will be used as gravatar email by default

   #### Returns

   ```typescript
   {
      user: User, //see /users/myself
      accessToken: string
   }
   ```

-  `POST /auth/login` - login user

   #### Accepts following body:

   -  `email: string` - user's email
   -  `password: string` - password (>= 8 characters long)

   #### Returns

   ```typescript
   {
      user: User, //see /users/myself
      accessToken: string
   }
   ```

-  `POST /auth/refresh` - refreshes user's refresh token (Cookie `refreshToken` must be provided)
   #### Returns
   ```typescript
   {
      accessToken: string;
   }
   ```
-  `POST /auth/logout` - removes user's session (Cookie `refreshToken` must be provided)

### User

For all request to `/users/*` endpoints header `Authorization: Bearer <access-token>` must be provided. `:userID` parameter must be an integer greater than 0.

-  `GET /users/myself` - get current authenticated user
   #### Returns
   ```typescript
   {
      id: number
      email: string
      password: string
      registrationDate: Date
      username?: string
      age?: number
      gravatarEmail: string
   }
   ```
-  `PATCH /users/:userID` - update user's data

   #### Accepts following body (**at least one of following fields must be provided**):

   -  (optional) `username: string` - update user's username (from 1 to 20 characters long)
   -  (optional) `age: string` - update user's age (an integer greater than 0)
   -  (optional) `gravatarEmail: string` - update user's gravatar email

   #### Returns

   ```typescript
   User;
   ```

-  `PATCH /users/:userID/password`

   #### Accepts following body:

   -  `currentPassword: string` - user's current password
   -  `password: string` - new password
   -  `repeatedPassword: string` - must match the password field

### Note

For all request to `/notes/*` endpoints header `Authorization: Bearer <access-token>` must be provided. `:userID` and `:noteID` parameters must be an integer greater than 0.

-  `POST /notes` - creates a new note

   #### Accepts following body:

   -  `name: string` - the title of note (from 1 to 256 character long)
   -  `content: string` - the content of note (from 1 to 1000 character long)

   #### Returns

   ```typescript
   {
      id: number;
      name: string;
      content: string;
      userID: number;
      createdAt: Date;
      updatedAt: Date;
   }
   ```

-  `GET /notes/:userID` - get all notes of specified user

   #### Returns

   ```typescript
   Note[]
   ```

-  `GET /notes/:userID/:noteID` - get certain note of specified user

   #### Returns

   ```typescript
   Note;
   ```

-  `PATCH /notes/:noteID` - update note by id

   #### Accepts following body (**at least one of following fields must be provided**):

   -  (optional) `name: string` - the title of note (from 1 to 256 character long)
   -  (optional) `content: string` - the content of note (from 1 to 1000 character long)

   #### Returns

   ```typescript
   Note;
   ```

-  `DELETE /notes/:noteID` - deletes note by id

   #### Returns

   ```typescript
   Note;
   ```

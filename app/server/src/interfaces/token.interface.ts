export interface ITokens {
   accessToken: string;
   refreshToken: string;
}
export interface ITokenService {
   generateTokens: (payload: string | Buffer | object) => ITokens;
}

export interface AuthService {
  verifyToken(token: string): Promise<any>;
  createToken(payload: object, expiresIn?: string): Promise<string>;
}

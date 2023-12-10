import {AuthService} from "../interfaces/AuthService";
import jwt from "jsonwebtoken";

const SECRET_KEY = "1234"; // 使用一個安全的密鑰

class LocalAuthService implements AuthService {
  async verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
        if (err) {
          reject(err);
        } else {
          resolve(decodedToken);
        }
      });
    });
  }

  async createToken(payload: object, expiresIn = "1h"): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, SECRET_KEY, {expiresIn}, (err, token) => {
        if (err) {
          reject(err);
        } else if (typeof token === "undefined") {
          reject(new Error("Token generation failed"));
        } else {
          resolve(token);
        }
      });
    });
  }
}

export {LocalAuthService};


import {AuthService} from "../interfaces/AuthService";
import {FirebaseService} from "./FirebaseStore.service";

class FirebaseAuthService implements AuthService {
  private admin: any;

  constructor() {
    this.admin = FirebaseService.getInstance().getAdmin();
  }

  async verifyToken(token: string): Promise<any> {
    return this.admin.auth().verifyIdToken(token);
  }

  async createToken(payload: object, expiresIn = "1h"): Promise<string> {
    return this.admin.auth().createCustomToken(payload);
  }
}

export {FirebaseAuthService};

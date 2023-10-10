
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
}

export {FirebaseAuthService};

import {AdminAlreadyExistsError} from "../errors/Admin.error";
import {Admin} from "../models/Admin.model";
import {FirebaseService} from "../services/FirebaseStore.service";

export interface AdminDAO {
  register(admin: Admin): Promise<boolean>;
  getAdminById(adminId: string): Promise<Admin | null>;
}

export class FirebaseAdminDAO implements AdminDAO {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = FirebaseService.getInstance().getDb();
  }

  public async register(admin: Admin): Promise<boolean> {
    if (admin.id === undefined) {
      throw new Error("admin id is undefined");
    }
    const adminData = await this.getAdminById(admin.id);
    if (adminData !== null) {
      throw new AdminAlreadyExistsError("Admin already exists");
    }
    await this.db.collection("admin").add(admin);
    return true;
  }

  public async getAdminById(adminId: string): Promise<Admin | null> {
    const adminRef = await this.db.collection("admin")
      .where("id", "==", adminId)
      .limit(1)
      .get();
    if (adminRef.empty) {
      return null;
    }
    const adminDoc = adminRef.docs[0];
    const admin = adminDoc.data() as Admin;
    return admin;
  }
}

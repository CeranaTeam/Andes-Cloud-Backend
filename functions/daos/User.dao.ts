import {UserNotFoundError} from "../errors/User.error";
import {User} from "../models/User.model";
import {FirebaseService} from "../services/FirebaseStore.service";

export interface UserDAO {
  register(user: User): Promise<boolean>;
  getCurrentPoint(id: string): Promise<number>;
  increasePoint(id: string, point: number): Promise<number>;
}

export class FirebaseUserDAO implements UserDAO {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = FirebaseService.getInstance().getDb();
  }

  public async register(user: User): Promise<boolean> {
    const userRef = await this.db.collection("user").add(user);
    if (!userRef) {
      return false;
    }
    return true;
  }

  public async getCurrentPoint(id: string): Promise<number> {
    const userRef = await this.db.collection("user")
      .where("uid", "==", id)
      .limit(1)
      .get();
    if (userRef.empty) {
      throw new UserNotFoundError("User not found");
    }
    const userDoc = userRef.docs[0];
    console.log(userDoc.data(), "===== data =====");
    const user = userDoc.data() as User;
    return user.point;
  }

  public async increasePoint(id: string, point: number): Promise<number> {
    const userRef = this.db.collection("users").doc(id);
    const userDoc = await userRef.get();
    const user = userDoc.data() as User;
    const newPoint = user.point + point;
    await userRef.update({point: newPoint});
    return newPoint;
  }
}

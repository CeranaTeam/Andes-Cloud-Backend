import {UserAlreadyExistsError, UserNotFoundError} from "../errors/User.error";
import {User} from "../models/User.model";
import {FirebaseService} from "../services/FirebaseStore.service";

export interface UserDAO {
  register(user: User): Promise<boolean>;
  getCurrentPoint(id: string): Promise<number>;
  increasePoint(uid: string, point: number): Promise<number>;
  getUserById(id: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  checkUserPassword(email: string, password: string): Promise<boolean>;
  appendPointLog(uid: string, point: number, reason: string): Promise<void>;
}

export class FirebaseUserDAO implements UserDAO {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = FirebaseService.getInstance().getDb();
  }

  public async getUserById(id: string): Promise<User | null> {
    const userRef = await this.db.collection("user")
      .where("uid", "==", id)
      .limit(1)
      .get();
    if (userRef.empty) {
      return null;
    }
    const userDoc = userRef.docs[0];
    const user = userDoc.data() as User;
    return user;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return null;
  }

  public async checkUserPassword(email: string, password: string): Promise<boolean> {
    return false;
  }

  public async register(user: User): Promise<boolean> {
    const userData = await this.getUserById(user.uid);
    if (userData !== null) {
      throw new UserAlreadyExistsError("User already exists");
    }
    await this.db.collection("user").add(user);
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
    const user = userDoc.data() as User;
    return user.point;
  }

  public async increasePoint(uid: string, point: number): Promise<number> {
    const userRef = this.db.collection("user").where("uid", "==", uid).limit(1);
    const userSnapshot = await userRef.get();
    if (userSnapshot.empty) {
      throw new UserNotFoundError("User not found");
    }
    const userDoc = userSnapshot.docs[0];
    const userRefToUpdate = userDoc.ref;
    const user = userDoc.data() as User;
    const newPoint = user.point + point;
    await userRefToUpdate.update({point: newPoint});
    return newPoint;
  }

  public async appendPointLog(uid: string, point: number, reason: string): Promise<void> {
    throw new Error("Not implemented");
  }
}

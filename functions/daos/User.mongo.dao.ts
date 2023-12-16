import {Db} from "mongodb";
import {mongoDatabase} from "../db/mongo";
import {UserAlreadyExistsError, UserNotFoundError} from "../errors/User.error";
import {User} from "../models/User.model";
import {UserDAO} from "./User.dao";

export class MongoUserDAO implements UserDAO {
  private db?: Db;

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await mongoDatabase.connect();
      this.db = mongoDatabase.getDb();
    }
    return this.db;
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const db = await this.getDb();
      const result = await db.collection("user").findOne({uid: id});
      if (result) {
        return {
          id: result._id.toString(),
          uid: result.uid,
          name: result.name,
          email: result.email,
          point: result.point,
        } as User;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const db = await this.getDb();
      const result = await db.collection("user").findOne({email: email});
      if (result) {
        return {
          id: result._id.toString(),
          uid: result.uid,
          name: result.name,
          email: result.email,
          point: result.point,
        } as User;
      }
      return null;
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  }

  async checkUserPassword(email: string, password: string): Promise<boolean> {
    try {
      const db = await this.getDb();
      const result = await db.collection("user").findOne({email: email});
      if (result) {
        return result.password === password;
      }
      return false;
    } catch (error) {
      throw new Error(`Error finding user: ${error}`);
    }
  }

  public async register(user: User): Promise<boolean> {
    const existingUser = await this.getUserByEmail(user.email);
    if (existingUser !== null) {
      throw new UserAlreadyExistsError("User already exists");
    }

    const db = await this.getDb();
    await db.collection("user").insertOne(user);
    return true;
  }

  public async getCurrentPoint(id: string): Promise<number> {
    const user = await this.getUserById(id);
    if (user === null) {
      throw new UserNotFoundError("User not found");
    }
    return user.point;
  }

  public async increasePoint(uid: string, point: number): Promise<number> {
    const user = await this.getUserById(uid);
    if (user === null) {
      throw new UserNotFoundError("User not found");
    }
    const newPoint = user.point + point;
    const db = await this.getDb();
    await db.collection("user").updateOne({uid}, {$set: {point: newPoint}});
    return newPoint;
  }

  public async appendPointLog(uid: string, point: number, reason: string): Promise<void> {
    const db = await this.getDb();
    await db.collection("user").updateOne({uid}, {$push: {pointLog: {point, reason}}});
  }
}

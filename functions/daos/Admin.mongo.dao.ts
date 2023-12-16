import {Db} from "mongodb";
import {Admin} from "../models/Admin.model";
import {AdminDAO} from "./Admin.dao";
import {AdminAlreadyExistsError} from "../errors/Admin.error";
import {mongoDatabase} from "../db/mongo";

export class MongoAdminDAO implements AdminDAO {
  private db?: Db;

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await mongoDatabase.connect();
      this.db = mongoDatabase.getDb();
    }
    return this.db;
  }

  public async register(admin: Admin): Promise<boolean> {
    const db = await this.getDb();
    if (!admin.id) {
      throw new Error("admin id is undefined");
    }

    const existingAdmin = await this.getAdminByEmail(admin.email);
    if (existingAdmin) {
      throw new AdminAlreadyExistsError("Admin already exists");
    }

    await db.collection("admins").insertOne(admin);
    return true;
  }

  public async getAdminById(adminId: string): Promise<Admin | null> {
    const db = await this.getDb();
    const admin = await db.collection("admins")
      .findOne({id: adminId});

    if (!admin) {
      return null;
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    } as Admin;
  }

  public async getAdminByEmail(email: string): Promise<Admin | null> {
    const db = await this.getDb();
    const admin = await db.collection("admins")
      .findOne({email});

    if (!admin) {
      return null;
    }

    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    } as Admin;
  }

  public async checkAdminPassword(email: string, password: string): Promise<boolean> {
    const db = await this.getDb();
    const admin = await db.collection("admins")
      .findOne({email});

    if (!admin) {
      return false;
    }

    return admin.password === password;
  }
}

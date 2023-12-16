import {Db, ObjectId} from "mongodb";
import {TrashCan} from "../models/TrashCan.model";
import {TrashCanDAO} from "./TrashCan.dao";
import {TrashCanAlreadyExistsError} from "../errors/TrashCan.error";
import {mongoDatabase} from "../db/mongo";

export class MongoTrashCanDAO implements TrashCanDAO {
  private db?: Db;

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await mongoDatabase.connect();
      this.db = mongoDatabase.getDb();
    }
    return this.db;
  }

  public async register(trashCan: TrashCan): Promise<boolean> {
    const db = await this.getDb();
    const trashCanData = await this.getTrashCanByName(trashCan.name);
    if (trashCanData !== null) {
      throw new TrashCanAlreadyExistsError("TrashCan already exists");
    }

    const insertResult = await db.collection("trash_cans").insertOne(trashCan);
    return insertResult.acknowledged;
  }

  public async getTrashCanByName(trashCanName: string): Promise<TrashCan | null> {
    const db = await this.getDb();
    const trashCanDoc = await db.collection("trash_cans")
      .findOne({name: trashCanName});
    if (!trashCanDoc) {
      return null;
    }
    const trashCan = {
      id: trashCanDoc._id.toString(),
      name: trashCanDoc.name,
      adminId: trashCanDoc.adminId.toString(),
    } as TrashCan;
    return trashCan;
  }

  public async getTrashCanById(trashCanId: string): Promise<TrashCan | null> {
    const db = await this.getDb();
    const trashCanDoc = await db.collection("trash_cans")
      .findOne({_id: new ObjectId(trashCanId)});

    if (!trashCanDoc) {
      return null;
    }
    return {
      id: trashCanDoc._id.toString(),
      name: trashCanDoc.name,
      adminId: trashCanDoc.adminId.toString(),
    } as TrashCan;
  }

  public async getTrashCanListByAdminId(adminId: string): Promise<TrashCan[]> {
    const db = await this.getDb();
    const trashCans = await db.collection("trash_cans")
      .find({adminId: adminId})
      .toArray();

    return trashCans.map((trashCan) => ({
      id: trashCan._id.toString(),
      name: trashCan.name,
      adminId: trashCan.adminId.toString(),
      imageUrl: trashCan.imageUrl,
    } as TrashCan));
  }
}

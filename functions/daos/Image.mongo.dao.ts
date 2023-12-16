import {Db, ObjectId} from "mongodb";
import {mongoDatabase} from "../db/mongo";
import {Image} from "../models/Image.model";
import {ImageDAO} from "./Image.dao";

class MongoImageDAO implements ImageDAO {
  private db?: Db;

  private async getDb(): Promise<Db> {
    if (!this.db) {
      await mongoDatabase.connect();
      this.db = mongoDatabase.getDb();
    }
    return this.db;
  }

  public async getImagesByUserId(userId: string): Promise<Array<Image>> {
    const db = await this.getDb();
    const imageDocs = await db.collection("images")
      .find({userId: userId})
      .toArray();
    const images = imageDocs.map((doc) => this.convertToImage(doc));
    return images;
  }

  public async getImagesByTrashCanId(trashCanId: string): Promise<Array<Image>> {
    const db = await this.getDb();
    const imageDocs = await db.collection("images")
      .find({trashCanId: trashCanId})
      .toArray();

    return imageDocs.map((doc) => this.convertToImage(doc));
  }

  public async getImageById(imageId: string): Promise<Image | null> {
    const db = await this.getDb();
    const doc = await db.collection("images")
      .findOne({_id: new ObjectId(imageId)});

    return doc ? this.convertToImage(doc) : null;
  }

  public async collectImages(trashCanId: string, userId: string): Promise<Array<Image>> {
    const db = await this.getDb();
    const updateResult = await db.collection("images")
      .updateMany(
        {trashCanId: trashCanId, isCollected: false},
        {$set: {isCollected: true, userId: userId}}
      );

    if (updateResult.matchedCount === 0) {
      return [];
    }

    return this.getImagesByTrashCanId(trashCanId);
  }

  public async getNotCollectedImagesByTrashCanId(trashCanId: string): Promise<Array<Image>> {
    const db = await this.getDb();
    const imageDocs = await db.collection("images")
      .find({trashCanId: trashCanId, isCollected: false})
      .toArray();
    return imageDocs.map((doc) => this.convertToImage(doc));
  }

  public async labelImage(uid: string, imageId: string, label: string): Promise<boolean> {
    const db = await this.getDb();
    const updateResult = await db.collection("images")
      .updateOne(
        {_id: new ObjectId(imageId)},
        {$set: {"labelResult.label": label}}
      );

    return updateResult.modifiedCount === 1;
  }

  public async detectImage(image: Image): Promise<boolean> {
    const db = await this.getDb();
    const insertResult = await db.collection("images").insertOne(image);
    return insertResult.acknowledged;
  }

  private convertToImage(doc: any): Image {
    return {
      ...doc,
    };
  }
}

export {MongoImageDAO};

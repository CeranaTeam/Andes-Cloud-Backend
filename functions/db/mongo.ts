import {MongoClient, Db} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

class MongoDatabase {
  private client: MongoClient;
  private db!: Db;
  private url: string;
  private dbName = "dev";

  constructor() {
    this.db;
    this.url = process.env.MONGO_CONN_STRING || "mongodb://localhost:27017";
    console.log('%cmongo.ts line:15 this.url', 'color: #007acc;', this.url);
    this.client = new MongoClient(this.url);
    this.dbName = process.env.MONGO_DB_NAME || "dev";
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
  }

  async disconnect() {
    await this.client.close();
  }

  getDb() {
    return this.db;
  }
}

export const mongoDatabase = new MongoDatabase();

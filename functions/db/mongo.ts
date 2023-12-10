import {MongoClient, Db} from "mongodb";


class MongoDatabase {
  private client: MongoClient;
  private db!: Db;
  private url: string;
  private dbName = "dev";

  constructor() {
    this.db;
    this.url = process.env.MONGO_URL || "mongodb://localhost:27017";
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

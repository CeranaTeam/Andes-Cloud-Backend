/* eslint-disable */
import * as admin from "firebase-admin";
import {Bucket} from "@google-cloud/storage";

class FirebaseService {
  private static instance: FirebaseService;
  private db?: FirebaseFirestore.Firestore;
  private bucket?: Bucket;

  private constructor() { }

  static getInstance(): FirebaseService {
    if (!this.instance) {
      this.instance = new FirebaseService();
      this.instance.initialize();
    }
    return this.instance;
  }

  initialize(): void {
    admin.initializeApp();
    this.db = admin.firestore();
    this.bucket = admin.storage().bucket("gs://andes-cloud.appspot.com");
  }

  getDb(): FirebaseFirestore.Firestore {
    if (!this.db) {
      throw new Error("Firebase has not been initialized. Call initialize() first.");
    }
    return this.db;
  }

  getBucket(): Bucket {
    if (!this.bucket) {
      throw new Error("Firebase Storage has not been initialized. Call initialize() first.");
    }
    return this.bucket;
  }

  getAdmin(): typeof admin {
    return admin;
  }
}

export {FirebaseService};



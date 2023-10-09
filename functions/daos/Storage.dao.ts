import {Bucket} from "@google-cloud/storage";
import {FirebaseService} from "../services/FirebaseStore.service";
export interface StorageDAO {
  uploadImage(base64Data: string, imageName: string): Promise<string>;
}

export class FirebaseStorageDAO implements StorageDAO {
  private bucket: Bucket;

  constructor() {
    this.bucket = FirebaseService.getInstance().getBucket();
  }


  public async uploadImage(base64Data: string, imageName: string): Promise<string> {
    const buffer = Buffer.from(base64Data, "base64");
    const filePath = `images/${imageName}`;

    try {
      await this.bucket.file(filePath).save(buffer, {
        contentType: "image/jpeg",
        gzip: true,
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/andes-cloud.appspot.com/o/images%2F${imageName}?alt=media`;
      return publicUrl;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

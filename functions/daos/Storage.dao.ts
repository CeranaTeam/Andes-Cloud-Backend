import {Bucket} from "@google-cloud/storage";
import {FirebaseService} from "../services/FirebaseStore.service";
export interface StorageDAO {
  uploadImage(trashCanId: string, image: string): Promise<void>;
}

export class FirebaseStorageDAO implements StorageDAO {
  private bucket: Bucket;

  constructor() {
    this.bucket = FirebaseService.getInstance().getBucket();
  }


  public async uploadImage(trashCanId: string, base64Data: string): Promise<void> {
    const buffer = Buffer.from(base64Data, "base64");
    const filePath = `images/${trashCanId}/test.png`;

    try {
      await this.bucket.file(filePath).save(buffer, {
        contentType: "image/png",
        gzip: true,
      });

      const signedUrls = await this.bucket.file(filePath).getSignedUrl({
        action: "read",
        expires: "03-09-2491",
      });

      console.log(signedUrls);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }
}

import fs from "fs";
import path from "path";
import {path as rootPath} from "app-root-path";

export class LocalStorageDAO {
  private storagePath: string;

  constructor() {
    this.storagePath = path.join(rootPath, "/public/images");
  }

  public async uploadImage(base64Data: string, imageName: string): Promise<string> {
    const buffer = Buffer.from(base64Data, "base64");
    const filePath = path.join(this.storagePath, imageName);

    try {
      fs.mkdirSync(this.storagePath, {recursive: true});
      fs.writeFileSync(filePath, buffer);
      console.log("%cStorage.local.dao.ts line:18 filePath", "color: #007acc;", filePath);

      const url = `/static/images/${imageName}`;
      return url;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

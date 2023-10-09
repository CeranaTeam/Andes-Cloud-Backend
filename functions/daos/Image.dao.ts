import {Image} from "../models/Image.model";
import {FirebaseService} from "../services/FirebaseStore.service";

export interface ImageDAO {
  getImagesByUserId(userId: string): Promise<any>
  getImagesByTrashCanId(trashCanId: string): Promise<any>
  labelImage(image: Image, label: string, uid: string): Promise<boolean>;
  detectImage(image: Image): Promise<boolean>;
}

class FirebaseImageDAO implements ImageDAO {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = FirebaseService.getInstance().getDb();
  }

  public async getImagesByUserId(userId: string): Promise<any> {
    const imageRef = await this.db.collection("images")
      .where("uid", "==", userId)
      .get();
    if (imageRef.empty) {
      return null;
    }
    const imageDocs = imageRef.docs;
    const images = imageDocs.map((imageDoc) => {
      const image = imageDoc.data();
      return image;
    });
    return images;
  }

  public async getImagesByTrashCanId(trashCanId: string): Promise<any> {
    const imageRef = await this.db.collection("images")
      .where("trashCanId", "==", trashCanId)
      .get();
    if (imageRef.empty) {
      return null;
    }
    const imageDocs = imageRef.docs;
    const images = imageDocs.map((imageDoc) => {
      const image = imageDoc.data();
      return image;
    });
    return images;
  }

  public async labelImage(image: Image): Promise<boolean> {
    await this.db.collection("image").add(image);
    return true;
  }

  public async detectImage(image: Image): Promise<boolean> {
    await this.db.collection("image").add(image);
    return true;
  }
}

export {FirebaseImageDAO};

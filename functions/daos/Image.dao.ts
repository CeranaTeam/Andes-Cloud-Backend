import {Image} from "../models/Image.model";
import {FirebaseService} from "../services/FirebaseStore.service";

export interface ImageDAO {
  getImagesByUserId(userId: string): Promise<Array<Image> | null>
  getImagesByTrashCanId(trashCanId: string): Promise<Array<Image> | null>
  collectImages(trashCanId: string, userId: string): Promise<Array<Image> | null>
  getNotCollectedImagesByTrashCanId(trashCanId: string): Promise<Array<Image> | null>
  labelImage(uid: string, imageId: string, label: string): Promise<boolean>;
  detectImage(image: Image): Promise<boolean>;
}

class FirebaseImageDAO implements ImageDAO {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = FirebaseService.getInstance().getDb();
  }

  public async getImagesByUserId(userId: string): Promise<Array<Image> | null> {
    const imageRef = await this.db.collection("image")
      .where("userId", "==", userId)
      .get();
    if (imageRef.empty) {
      return [];
    }
    const imageDocs = imageRef.docs;
    const images = imageDocs.map((imageDoc) => {
      const image = imageDoc.data();
      image.id = imageDoc.id;
      return image as Image;
    });
    return images;
  }

  public async getImagesByTrashCanId(trashCanId: string): Promise<Array<Image> | null> {
    const imageRef = await this.db.collection("image")
      .where("trashCanId", "==", trashCanId)
      .get();
    if (imageRef.empty) {
      return null;
    }
    const imageDocs = imageRef.docs;
    const images = imageDocs.map((imageDoc) => {
      const image = imageDoc.data();
      image.id = imageDoc.id;
      return image as Image;
    });
    return images;
  }

  public async collectImages(trashCanId: string, userId: string): Promise<Array<Image> | null> {
    const imageRef = await this.db.collection("image")
      .where("trashCanId", "==", trashCanId)
      .where("isCollected", "==", false)
      .get();
    if (imageRef.empty) {
      return null;
    }
    const imageDocs = imageRef.docs;
    const images = imageDocs.map((imageDoc) => {
      const image = imageDoc.data();
      image.id = imageDoc.id;
      return image as Image;
    });
    const batch = this.db.batch();
    images.forEach((image) => {
      const imageRef = this.db.collection("image").doc(image.id!);
      batch.update(imageRef, {
        isCollected: true,
        userId: userId,
      });
    });
    await batch.commit();
    return images;
  }

  public async getNotCollectedImagesByTrashCanId(trashCanId: string): Promise<Array<Image> | null> {
    const imageRef = await this.db.collection("image")
      .where("trashCanId", "==", trashCanId)
      .where("isCollected", "==", false)
      .get();
    if (imageRef.empty) {
      return null;
    }
    const imageDocs = imageRef.docs;
    const images = imageDocs.map((imageDoc) => {
      const image = imageDoc.data();
      image.id = imageDoc.id;
      return image as Image;
    });
    return images;
  }

  public async labelImage(uid: string, imageId: string, label: string): Promise<boolean> {
    const imageRef = await this.db.collection("images").doc(imageId);
    await imageRef.update({
      labelResult: {"label": label},
      isCollected: true,
      userId: uid,
    });
    return true;
  }

  public async detectImage(image: Image): Promise<boolean> {
    await this.db.collection("image").add(image);
    return true;
  }
}

export {FirebaseImageDAO};

import {TrashCanAlreadyExistsError} from "../errors/TrashCan.error";
import {TrashCan} from "../models/TrashCan.model";
import {FirebaseService} from "../services/FirebaseStore.service";

export interface TrashCanDAO {
  register(trashCan: TrashCan): Promise<boolean>;
  getTrashCanByName(trashCanId: string): Promise<TrashCan | null>;
  getTrashCanById(trashCanId: string): Promise<TrashCan | null>;
  getTrashCanListByAdminId(adminId: string): Promise<TrashCan[]>;
}

export class FirebaseTrashCanDAO implements TrashCanDAO {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    this.db = FirebaseService.getInstance().getDb();
  }

  public async register(trashCan: TrashCan): Promise<boolean> {
    const trashCanData = await this.getTrashCanByName(trashCan.name);
    if (trashCanData !== null) {
      throw new TrashCanAlreadyExistsError("TrashCan already exists");
    }
    await this.db.collection("trash_can").add(trashCan);
    return true;
  }

  public async getTrashCanByName(trashCanName: string): Promise<TrashCan | null> {
    const trashCanRef = await this.db.collection("trash_can")
      .where("name", "==", trashCanName)
      .limit(1)
      .get();
    if (trashCanRef.empty) {
      return null;
    }
    const trashCanDoc = trashCanRef.docs[0];
    const trashCan = trashCanDoc.data() as TrashCan;
    return trashCan;
  }

  public async getTrashCanById(trashCanId: string): Promise<TrashCan | null> {
    const trashCanRef = await this.db.collection("trash_can").doc(trashCanId).get();
    if (!trashCanRef.exists) {
      return null;
    }
    const trashCanDoc = trashCanRef.data();
    const trashCan = {
      ...trashCanDoc,
      id: trashCanId,
    } as TrashCan;
    return trashCan;
  }

  public async getTrashCanListByAdminId(adminId: string): Promise<TrashCan[]> {
    const trashCanRef = await this.db.collection("trash_can")
      .where("adminId", "==", adminId)
      .get();
    if (trashCanRef.empty) {
      return [];
    }
    const trashCanList = trashCanRef.docs.map((trashCanDoc) => {
      const trashCan = trashCanDoc.data() as TrashCan;
      return trashCan;
    });
    return trashCanList;
  }
}

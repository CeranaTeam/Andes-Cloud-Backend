import {ImageDAO} from "../daos/Image.dao";
import {StorageDAO} from "../daos/Storage.dao";
import {TrashCanDAO} from "../daos/TrashCan.dao";
import {DetectResultDTO} from "../dtos/TrashCan.dto";
import {TrashCanNotFoundError} from "../errors/TrashCan.error";
import {Image} from "../models/Image.model";

export default class TrashCanService {
  private trashCanDAO: TrashCanDAO;
  private storageDAO: StorageDAO;
  private imageDAO: ImageDAO;

  constructor(trashCanDAO: TrashCanDAO, storageDAO: StorageDAO, imageDAO: ImageDAO) {
    this.trashCanDAO = trashCanDAO;
    this.storageDAO = storageDAO;
    this.imageDAO = imageDAO;
  }

  public async detectImage(detectResultDTO: DetectResultDTO, trashCanId: string) {
    const trashCanData = await this.trashCanDAO.getTrashCanById(trashCanId);
    if (trashCanData === null) {
      throw new TrashCanNotFoundError("trash can not found");
    }
    const imageUrl = await this.storageDAO.uploadImage(detectResultDTO.base64Image, detectResultDTO.imageName);
    const image: Image = {
      detectResult: {"label": detectResultDTO.detectResult},
      labelResult: {"label": ""},
      point: 0,
      imageUrl: imageUrl,
      isCollected: false,
      trashCanId: trashCanData.id,
      trashCanLocation: trashCanData.location,
      userId: "",
      createdAt: Date.now(),
    };
    await this.imageDAO.detectImage(image);
    return true;
  }
}

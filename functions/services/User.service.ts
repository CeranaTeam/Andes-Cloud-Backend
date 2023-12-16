
import {ImageDAO} from "../daos/Image.dao";
import {TrashCanDAO} from "../daos/TrashCan.dao";
import {UserDAO} from "../daos/User.dao";
import {UserLocalRegisterDTO} from "../dtos/User.dto";
import {UnauthorizedError} from "../errors/Base.error";
import {ImageAlreadyLabelledError, ImageNotFoundError} from "../errors/Image.error";
import {TrashCanNotFoundError} from "../errors/TrashCan.error";
import {User} from "../models/User.model";
class UserService {
  private userDAO: UserDAO;
  private imageDAO: ImageDAO;
  private trashCanDAO: TrashCanDAO;

  constructor(userDAO: UserDAO, imageDAO: ImageDAO, trashCanDAO: TrashCanDAO) {
    this.userDAO = userDAO;
    this.imageDAO = imageDAO;
    this.trashCanDAO = trashCanDAO;
  }

  public register(userRegisterDto: UserLocalRegisterDTO) {
    const user: User = {
      uid: userRegisterDto.uid || "",
      name: userRegisterDto.name,
      email: userRegisterDto.email,
      point: 0,
      password: userRegisterDto.password,
      pointLog: [],
    };
    return this.userDAO.register(user);
  }

  public async signIn(email: string, password: string) {
    const user = await this.userDAO.getUserByEmail(email);
    if (user === null) {
      throw new UnauthorizedError("查無此用戶");
    }
    const isPasswordCorrect = this.userDAO.checkUserPassword(email, password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("密碼錯誤");
    }
    return user;
  }

  public checkCurrentPoint = async (userId: string) => {
    const point = await this.userDAO.getCurrentPoint(userId);
    const pointLog = await this.userDAO.getPointLog(userId);
    return {
      point,
      pointLog,
    };
  };

  public labelImage = async (uid: string, imageId: string, label: string) => {
    const image = await this.imageDAO.getImageById(imageId);
    if (image === null) {
      throw new ImageNotFoundError("沒有可以增加的點數");
    }
    if (image.labelResult.label !== "") {
      throw new ImageAlreadyLabelledError("圖片已經被標記過了");
    }
    if (image.userId !== uid) {
      throw new UnauthorizedError("沒有權限標記此圖片");
    }
    this.increase_point_by_labelling(uid);
    return await this.imageDAO.labelImage(uid, imageId, label);
  };

  public async increasePointByThrowing(trashCanId: string, userId: string) {
    const trashCan = await this.trashCanDAO.getTrashCanById(trashCanId);
    if (trashCan === null) {
      throw new TrashCanNotFoundError("查無此垃圾桶");
    }

    const notCollectedImages = await this.imageDAO.getNotCollectedImagesByTrashCanId(trashCanId);
    if (notCollectedImages.length === 0) {
      throw new ImageNotFoundError("沒有可以增加的點數");
    }
    await this.imageDAO.collectImages(trashCanId, userId);
    const newPoint = this.increase_point(notCollectedImages.length, userId);
    this.appendPointLog(userId, notCollectedImages.length, "throw");
    return newPoint;
  }

  public increase_point_by_labelling(uid: string) {
    this.increase_point(2, uid);
    this.appendPointLog(uid, 2, "label");
  }

  private async increase_point(point: number, userId: string) {
    const result = await this.userDAO.increasePoint(userId, point);
    return result;
  }

  public async getImageList(uid: string) {
    const images = await this.imageDAO.getImagesByUserId(uid);
    return images;
  }

  public async appendPointLog(uid: string, point: number, type: string) {
    await this.userDAO.appendPointLog(uid, point, type);
  }
}

export default UserService;

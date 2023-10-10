
import {ImageDAO} from "../daos/Image.dao";
import {UserDAO} from "../daos/User.dao";
import {UserRegisterDTO} from "../dtos/User.dto";
import {UnauthorizedError} from "../errors/Base.error";
import {ImageAlreadyLabelledError, ImageNotFoundError} from "../errors/Image.error";
import {User} from "../models/User.model";
class UserService {
  private userDAO: UserDAO;
  private imageDAO: ImageDAO;

  constructor(userDAO: UserDAO, imageDAO: ImageDAO) {
    this.userDAO = userDAO;
    this.imageDAO = imageDAO;
  }

  public register(userRegisterDto: UserRegisterDTO) {
    const user: User = {
      uid: userRegisterDto.uid,
      name: userRegisterDto.name,
      email: userRegisterDto.email,
      point: 0,
    };
    return this.userDAO.register(user);
  }

  public checkCurrentPoint = async (userId: string) => {
    const point = await this.userDAO.getCurrentPoint(userId);
    return point;
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
    return await this.imageDAO.labelImage(uid, imageId, label);
  };

  public async increasePointByThrowing(trashCanId: string, userId: string) {
    const images = await this.imageDAO.collectImages(trashCanId, userId);
    if (images.length === 0) {
      throw new ImageNotFoundError("沒有可以增加的點數");
    }
    const amount = images.length;
    const newPoint = this.increase_point(amount, userId);
    return newPoint;
  }

  public increase_point_by_labelling() {
    // this.increase_point(2);
  }

  private async increase_point(point: number, userId: string) {
    const result = await this.userDAO.increasePoint(userId, point);
    return result;
  }

  public async getImageList(uid: string) {
    return this.imageDAO.getImagesByUserId(uid);
  }
}

export default UserService;

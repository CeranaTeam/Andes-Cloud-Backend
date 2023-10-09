/* eslint-disable */
import { ImageDAO } from "../daos/Image.dao";
import { UserDAO } from "../daos/User.dao";
import { UserRegisterDTO } from "../dtos/User.dto";
import { User } from "../models/User.model";
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
    }
    return this.userDAO.register(user);
  }

  public checkCurrentPoint = async (userId: string) => {
    const point = await this.userDAO.getCurrentPoint(userId);
    return point;
  }

  public labelImage = async (uid: string, imageId: string, label: string) => {
    return await this.imageDAO.labelImage(uid, imageId, label);
  }

  public async increasePointByThrowing(trashCanId: string, userId: string) {
    const images = await this.imageDAO.collectImages(trashCanId, userId);
    if (images === null) {
      return null;
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

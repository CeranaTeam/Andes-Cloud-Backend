/* eslint-disable */
import { UserDAO } from "../daos/User.dao";
import { UserRegisterDTO } from "../dtos/User.dto";
import { User } from "../models/User.model";
import { userRegisterDtoToUserModel } from "../transformers/user.transformer";
class UserService {
  private userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }


  public register(userRegisterDto: UserRegisterDTO) {
    const user: User = userRegisterDtoToUserModel(userRegisterDto);
    return this.userDAO.register(user);
  }

  public checkCurrentPoint = async (userId: string) => {
    const point = await this.userDAO.getCurrentPoint(userId);
    return point;
  }

  public increase_point_by_thorwing() {
    this.increase_point(1);
  }

  public increase_point_by_labelling() {
    this.increase_point(2);
  }

  private increase_point(point: number) {

  }

  public get_image_info_list() {

  }
}

export default UserService;

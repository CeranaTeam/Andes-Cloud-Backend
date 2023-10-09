/* eslint-disable */
import { UserDAO } from "../daos/User.dao";
class UserService {
  private userDAO: UserDAO;

  constructor(userDAO: UserDAO) {
    this.userDAO = userDAO;
  }

  /**
   * register
   */
  public register() {

  }

  /**
   * check_current_point
   */
  public checkCurrentPoint = async (userId: string) => {
    const point = await this.userDAO.getCurrentPoint(userId);
    return point;
  }

  /**
   * increase_point_by_thorwing
   */
  public increase_point_by_thorwing() {
    this.increase_point(1);
  }

  /**
   * increase_point_by_labelling
   */
  public increase_point_by_labelling() {
    this.increase_point(2);
  }

  private increase_point(point: number) {

  }

  /**
   * get_image_info_list
   */
  public get_image_info_list() {

  }
}

export default UserService;

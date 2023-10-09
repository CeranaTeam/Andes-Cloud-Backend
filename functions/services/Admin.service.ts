import {AdminDAO} from "../daos/Admin.dao";
import {StorageDAO} from "../daos/Storage.dao";
import {TrashCanDAO} from "../daos/TrashCan.dao";
import {AddTrashCanDTO, AdminRegisterDTO} from "../dtos/Admin.dto";
import {AdminNotFoundError} from "../errors/Admin.error";
import {TrashCanNotFoundError} from "../errors/TrashCan.error";
import {Admin} from "../models/Admin.model";

/* eslint-disable */
export default class AdminService {
  private adminDAO: AdminDAO;
  private trashCanDAO: TrashCanDAO;
  private storageDAO: StorageDAO;

  constructor(adminDAO: AdminDAO, trashCanDAO: TrashCanDAO, storageDAO: StorageDAO) {
    this.adminDAO = adminDAO;
    this.trashCanDAO = trashCanDAO;
    this.storageDAO = storageDAO;
  }

  public register(adminRegisterDTO: AdminRegisterDTO) {
    const admin: Admin = {
      id: adminRegisterDTO.uid,
      name: adminRegisterDTO.name,
      email: adminRegisterDTO.email,
    }
    return this.adminDAO.register(admin);
  }

  public async addTrashCan(addTrashCanDto: AddTrashCanDTO, adminId: string) {
    const adminData = await this.adminDAO.getAdminById(adminId);
    if (adminData === null) {
      throw new AdminNotFoundError("not registered yet");
    }
    const trashCanData = await this.trashCanDAO.getTrashCanByName(addTrashCanDto.name);
    if (trashCanData === null) {
      throw new TrashCanNotFoundError("trash can already exists");
    }
    // upload img to storage
    this.storageDAO.uploadImage(trashCanData.id, addTrashCanDto.base64Image);
    // add trash can to db
    await this.trashCanDAO.register(trashCanData);

    return true;
  }

  public get_trash_can_list() {

  }

  public get_img_info_list(trash_can_id: string) {

  }
}

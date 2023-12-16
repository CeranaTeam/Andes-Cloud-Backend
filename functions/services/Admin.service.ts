import {AdminDAO} from "../daos/Admin.dao";
import {ImageDAO} from "../daos/Image.dao";
import {StorageDAO} from "../daos/Storage.dao";
import {TrashCanDAO} from "../daos/TrashCan.dao";
import {AddTrashCanDTO, AdminRegisterDTO} from "../dtos/Admin.dto";
import {AdminNotFoundError} from "../errors/Admin.error";
import {UnauthorizedError} from "../errors/Base.error";
import {TrashCanNotFoundError} from "../errors/TrashCan.error";
import {Admin} from "../models/Admin.model";
import {TrashCan} from "../models/TrashCan.model";


export default class AdminService {
  private adminDAO: AdminDAO;
  private trashCanDAO: TrashCanDAO;
  private storageDAO: StorageDAO;
  private imageDAO: ImageDAO;

  constructor(adminDAO: AdminDAO, trashCanDAO: TrashCanDAO, storageDAO: StorageDAO, imageDAO: ImageDAO) {
    this.adminDAO = adminDAO;
    this.trashCanDAO = trashCanDAO;
    this.storageDAO = storageDAO;
    this.imageDAO = imageDAO;
  }

  public register(adminRegisterDTO: AdminRegisterDTO) {
    const admin: Admin = {
      id: adminRegisterDTO.uid,
      name: adminRegisterDTO.name,
      email: adminRegisterDTO.email,
      password: adminRegisterDTO.password,
    };
    return this.adminDAO.register(admin);
  }

  public async signIn(email: string, password: string) {
    const admin = await this.adminDAO.getAdminByEmail(email);
    if (admin === null) {
      throw new UnauthorizedError("查無此用戶");
    }
    const isPasswordCorrect = this.adminDAO.checkAdminPassword(email, password);
    if (!isPasswordCorrect) {
      throw new UnauthorizedError("密碼錯誤");
    }
    return admin;
  }


  public async addTrashCan(addTrashCanDto: AddTrashCanDTO, adminId: string) {
    const adminData = await this.adminDAO.getAdminById(adminId);
    if (adminData === null) {
      throw new AdminNotFoundError("not registered yet");
    }
    const trashCanData = await this.trashCanDAO.getTrashCanByName(addTrashCanDto.trashCanName);
    if (trashCanData !== null) {
      throw new TrashCanNotFoundError("trash can already exists");
    }
    // upload img to storage
    const imageUrl = await this.storageDAO.uploadImage(addTrashCanDto.base64Image, addTrashCanDto.imageName);
    const trashCan: TrashCan = {
      name: addTrashCanDto.trashCanName,
      location: addTrashCanDto.location,
      imageUrl: imageUrl,
      adminId: adminId,
    };
    // add trash can to db
    await this.trashCanDAO.register(trashCan);

    return true;
  }

  public async getTrashCanList(adminId: string) {
    const admin = await this.adminDAO.getAdminById(adminId);
    if (admin === null) {
      throw new AdminNotFoundError("not registered yet");
    }
    return this.trashCanDAO.getTrashCanListByAdminId(adminId);
  }

  public async getImageInfoList(trashCanId: string, adminId: string) {
    const admin = await this.adminDAO.getAdminById(adminId);
    if (admin === null) {
      throw new AdminNotFoundError("not registered yet");
    }
    const trashCan = await this.trashCanDAO.getTrashCanById(trashCanId);
    if (trashCan === null) {
      throw new TrashCanNotFoundError("trash can not found");
    }
    if (trashCan.adminId !== adminId) {
      throw new UnauthorizedError("this trash can is not yours :} ");
    }
    return this.imageDAO.getImagesByTrashCanId(trashCanId);
  }
}

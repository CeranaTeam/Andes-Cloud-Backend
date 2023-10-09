import {AdminDAO} from "../daos/Admin.dao";
import {AdminRegisterDTO} from "../dtos/Admin.dto";
import {Admin} from "../models/Admin.model";
import {adminRegisterDtoToAdminModel} from "../transformers/admin.transformer";

/* eslint-disable */
export default class AdminService {
  private adminDAO: AdminDAO;

  constructor(adminDAO: AdminDAO) {
    this.adminDAO = adminDAO;
  }

  public register(adminRegisterDTO: AdminRegisterDTO) {
    const admin: Admin = adminRegisterDtoToAdminModel(adminRegisterDTO);
    return this.adminDAO.register(admin);
  }

  public register_trash_can() {

  }

  public get_trash_can_list() {

  }

  public get_img_info_list(trash_can_id: string) {

  }
}

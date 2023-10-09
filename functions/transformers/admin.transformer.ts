import {AdminRegisterDTO} from "../dtos/Admin.dto";
import {Admin} from "../models/Admin.model";

function adminRegisterDtoToAdminModel(adminRegisterDTO: AdminRegisterDTO): Admin {
  return {
    id: adminRegisterDTO.uid,
    name: adminRegisterDTO.name,
    email: adminRegisterDTO.email,
  };
}

export {adminRegisterDtoToAdminModel};

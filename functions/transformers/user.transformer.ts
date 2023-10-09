import {UserRegisterDTO} from "../dtos/User.dto";
import {User} from "../models/User.model";

function userRegisterDtoToUserModel(userRegisterDTO: UserRegisterDTO, point: number): User {
  return {
    uid: userRegisterDTO.uid,
    name: userRegisterDTO.name,
    email: userRegisterDTO.email,
    point: point,
  };
}

export {userRegisterDtoToUserModel};

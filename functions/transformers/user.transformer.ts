import {UserRegisterDTO} from "../dtos/User.dto";
import {User} from "../models/User.model";

function userRegisterDtoToUserModel(userRegisterDTO: UserRegisterDTO): User {
  return {
    uid: userRegisterDTO.uid,
    name: userRegisterDTO.name,
    email: userRegisterDTO.email,
    point: 0,
  };
}

export {userRegisterDtoToUserModel};

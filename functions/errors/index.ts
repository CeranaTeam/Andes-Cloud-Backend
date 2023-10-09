import {UnauthorizedError} from "./Base.error";
import {
  ImageNotFoundError,
  ImageAlreadyLabelledError,
  ImageFormatError,
} from "./Image.error";
import {
  TrashCanAlreadyExistsError,
  TrashCanNotFoundError,
} from "./TrashCan.error";
import {
  UserNotFoundError,
  UserAlreadyExistsError,
  NoMoreImageToCollectError,
} from "./User.error";

export const errorStatusMap = {
  [UserNotFoundError.name]: 404,
  [UserAlreadyExistsError.name]: 409,
  [NoMoreImageToCollectError.name]: 404,
  [UnauthorizedError.name]: 403,
  [ImageNotFoundError.name]: 404,
  [ImageAlreadyLabelledError.name]: 409,
  [ImageFormatError.name]: 400,
  [TrashCanAlreadyExistsError.name]: 409,
  [TrashCanNotFoundError.name]: 404,
};

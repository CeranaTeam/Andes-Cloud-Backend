import {BaseError} from "./Base.error";

class UserNotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

class UserAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "UserAlreadyExistsError";
  }
}


class NoMoreImageToCollectError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "NoMoreImageToCollectError";
  }
}

export {UserNotFoundError, UserAlreadyExistsError, NoMoreImageToCollectError};

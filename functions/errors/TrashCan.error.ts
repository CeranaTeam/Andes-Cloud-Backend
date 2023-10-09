import {BaseError} from "./Base.error";

class TrashCanAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "TrashCanAlreadyExistsError";
  }
}

class TrashCanNotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "TrashCanNotFoundError";
  }
}

export {TrashCanAlreadyExistsError, TrashCanNotFoundError};



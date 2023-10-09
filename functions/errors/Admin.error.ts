import {BaseError} from "./Base.error";

class AdminNotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "AdminNotFoundError";
  }
}

class AdminAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "AdminAlreadyExistsError";
  }
}

export {AdminNotFoundError, AdminAlreadyExistsError};

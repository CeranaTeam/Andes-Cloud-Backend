import {BaseError} from "./Base.error";

class ImageNotFoundError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "ImageNotFoundError";
  }
}

class ImageAlreadyLabelledError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "ImageAlreadyLabelledError";
  }
}

class ImageFormatError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "ImageFormatError";
  }
}

export {ImageNotFoundError, ImageAlreadyLabelledError, ImageFormatError};

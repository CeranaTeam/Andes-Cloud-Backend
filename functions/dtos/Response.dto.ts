class BaseResponseData {
  public message: string;

  constructor(message: string) {
    this.message = message;
  }
}

class SuccessResponseData extends BaseResponseData {
  public success = true;
  public data: any;

  constructor(message: string, data: any) {
    super(message);
    this.data = data;
  }
}

class ErrorResponseData extends BaseResponseData {
  public success = false;
  public error: any;
  constructor(message: string, error: any) {
    super(message);
    this.error = error;
  }
}

export {
  SuccessResponseData,
  ErrorResponseData,
};

class BaseError extends Error {
  constructor(message: string) {
    super(message);
    // Ensure the name of this error is set as the function name above
    this.name = this.constructor.name;
    // This clips the stack trace to this constructor and above.
    Error.captureStackTrace(this, this.constructor);
  }
}

class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export {BaseError, UnauthorizedError};

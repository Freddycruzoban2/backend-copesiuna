export class CustomException extends Error {
  constructor(message: string, public statusCode: number = 500) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundException extends CustomException {
  constructor(message: string = "Resource not found") {
    super(message, 404);
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string = "Bad request") {
    super(message, 400);
  }
}

// Puedes agregar más excepciones personalizadas según sea necesario

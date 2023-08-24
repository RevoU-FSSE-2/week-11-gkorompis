type ApiError = {
  statusCode: string | number,
  message: string
};

export class StandardError implements ApiError {
  statusCode: string | number;
  message: string;

  constructor(statusCode:number | string, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }

  sendErrorResponse(res: any) {
    res.status(this.statusCode).json({ error: this.message });
  }
}

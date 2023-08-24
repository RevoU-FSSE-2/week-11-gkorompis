export class StandardError {
    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }
    sendErrorResponse(res) {
        res.status(this.statusCode).json({ error: this.message });
    }
}

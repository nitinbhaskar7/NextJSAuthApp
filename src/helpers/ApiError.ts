export class ApiError extends Error {
    statusCode: number;
    constructor(message="Something went wrong"  , statusCode=500) {
        super() ;
        this.message = message;
        this.statusCode = statusCode;

    }
}
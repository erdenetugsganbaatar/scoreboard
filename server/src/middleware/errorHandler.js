import { errorResponse } from "../helpers";
import { ValidationError } from "express-validation";

export default function (err, req, res, next) {
    if (err instanceof ValidationError) return res.status(err.statusCode).json(err)
    return errorResponse(req, res, err.message, err.statusCode, err);
}
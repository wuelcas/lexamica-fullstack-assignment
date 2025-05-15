import { type NextFunction, type Request, type Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "./utils/logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!err) {
    return;
  }

  logger.error(err.message, err);
  const statusCode = req.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  if (process.env.NODE_ENV !== "production") {
    res.status(statusCode).json({
      errorName: err.name,
      message: err.message,
      stack: err.stack,
      cause: err.cause,
    });
    return;
  }

  res.status(statusCode).json({ message: req.statusMessage });
};

export default errorHandler;

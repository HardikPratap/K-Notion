import { Request,Response,NextFunction } from "express";
import { logger } from "../utils/logger";

export function errorHandler(err:any, req: Request, res: Response, next: NextFunction){
    logger.error("Error")
    const status= err.status || 500;
    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || undefined
    })
}
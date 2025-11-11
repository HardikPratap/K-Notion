import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env";
import User from "../models/usermodel";

export interface AuthRequest extends Request {
  user?: any;
}

export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
    const token = header.split(" ")[1];
    const decoded: any = jwt.verify(token, ENV.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password").lean();
    if (!user) return res.status(401).json({ success: false, message: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
}
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // decoded should have user id and role if included at login
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

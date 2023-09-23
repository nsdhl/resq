import { NextFunction, Request, Response } from "express";
import { AuthRequest, IJwtPayload } from "../typings/interface";
import jwt from "jsonwebtoken";

// For verifying token
export const isLogin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = extractTokenFromHeader(req);
    console.log("hey", token)
    if (!token) {
      return res.status(401).json({
        ERR: "You are not authorized to access this route!"
      })
    }
    const payload = jwt.verify(token as string, process.env.JWT_SECRET as string)
    req.user = payload as IJwtPayload

    return next();
  } catch (err) {
    res.status(401).json({
      ERR: "Something terrible happened during token verification!",
      message: err
    })
  }
}


// Function that will extract token from header
const extractTokenFromHeader = (request: AuthRequest): string | undefined => {
  const [type, token] = request.headers.authorization?.split(' ') ?? [];
  return type === 'Bearer' ? token : undefined;
}

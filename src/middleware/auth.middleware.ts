import { NextFunction, Response } from "express";
import { jwtVerify } from "../helpers/jwtVerify";
import { AuthRequest, IJwtPayload } from "../typings/interface";


const isLogin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {

    const token = req?.headers?.authorization;

    if (!token) {
      return res.status(401).json({
        error: "Token is needed!"
      })
    }

    if (token.split(" ")[0] !== "Bearer") {
      return res.status(401).json({
        error: "Invalid Token!"
      })
    }

    const payload: IJwtPayload = jwtVerify(token.split(" ")[1]);

    req.user = payload as IJwtPayload;

    next();

  } catch (e) {
    res.status(401).json(e);
  }
}


export { isLogin }

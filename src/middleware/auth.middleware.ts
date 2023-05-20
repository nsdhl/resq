import { NextFunction, Response } from "express";
import { jwtVerify } from "../helpers/jwtVerify";
import { IGetAuthRequest } from "../typings/interface";


const isLogin = (req: IGetAuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

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

  const result: any = jwtVerify(token.split(" ")[1]);

  if (result.status === "failure") {
    return res.status(401).json(result.message)
  }

  req.user = {
    userId: result.message.userId,
    username: result.message.username
  }

  next();

}


export { isLogin }

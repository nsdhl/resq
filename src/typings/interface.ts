import { Request } from "express";

type User = {
  username: string;
  userId: string;
}

export interface IJwtPayload {
  userId: string;
  username: string;
}

export interface IGetAuthRequest extends Request {
  user: IJwtPayload
}


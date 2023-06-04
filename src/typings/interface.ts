import { Request } from "express";

export interface IJwtPayload {
  userId: string;
  username: string;
  location: {
    type: string;
    coordinate: number[];
  },
  iat: number;
  exp: number;
}

export interface AuthRequest<T = {}> extends Express.Request {
  headers: {
    authorization?: string;
  }
  user?: IJwtPayload;
  body: T;
}


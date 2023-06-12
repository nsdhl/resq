export interface IJwtPayload {
  userId?: string;
  username?: string;
  location?: {
    type: string;
    coordinate: number[];
  },
}

export interface AuthRequest<T = {}> extends Express.Request {
  user?: IJwtPayload;
  headers: {
    authorization?: string;
  }
  body: T;
}


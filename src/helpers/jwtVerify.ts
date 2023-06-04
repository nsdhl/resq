import jwt, { JwtPayload } from "jsonwebtoken";
import { IJwtPayload } from "../typings/interface";



export const jwtVerify = (token: string) => {
  try {
    const decoded: IJwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as IJwtPayload;

    return decoded;
  } catch (e) {
    throw new Error("Jwt is not valid!")

  }
}

import jwt, { JwtPayload } from "jsonwebtoken";



export const jwtVerify = (token: string) => {
  try {
    const decoded: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);

    return {
      status: "success",
      message: decoded
    }
  } catch (e) {
    return {
      status: "failure",
      message: e
    }
  }
}

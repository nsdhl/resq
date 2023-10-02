import { Response, Request } from "express";
import { AuthRequest, IJwtPayload } from "../typings/interface";
import { SoS } from "../models/sos.model";
import { notificationQueue } from "../process/notificationQueue";

export const createSoS = async (req: AuthRequest<{ location: string[], description:string }>, res: Response) => {
  try {

    const { userId } = req.user as IJwtPayload;
    const { location, description } = req.body;

    const sos = await SoS.create({
      user: userId,
      location: {
        type: "Point",
        coordinates: location
      },
      description
    })

    notificationQueue.add('notification', { location, description: "SoS", incidentName: "SoS" })
    res.status(200).json(sos);
  } catch (e) {
    res.status(400).json("Something terrible happened!")
  }
}

export const getAllSOS = async (req: Request, res: Response) => {
  const sos = await SoS.find();

  res.status(200).json(sos)
}

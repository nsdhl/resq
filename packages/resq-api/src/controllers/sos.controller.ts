import { Response } from "express";
import { AuthRequest, IJwtPayload } from "../typings/interface";
import { SoS } from "../models/sos.model";
import { notificationQueue } from "../process/notificationQueue";

export const createSoS = async (req: AuthRequest<{ location: string[] }>, res: Response) => {
  try {

    const { userId } = req.user as IJwtPayload;
    const { location } = req.body;

    const sos = await SoS.create({
      user: userId,
      location: {
        type: "Point",
        coordinates: location
      },
    })

    notificationQueue.add('notification', { location, description: "SoS", incidentName: "SoS" })
    res.status(200).json(sos);
  } catch (e) {
    res.status(400).json("Something terrible happened!")
  }
}

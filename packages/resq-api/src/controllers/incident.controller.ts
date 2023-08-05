import { Request, Response } from "express";
import { Incident } from "../models/incident.model";
import { notificationQueue } from "../process/notificationQueue";
import { AuthRequest, IJwtPayload } from "../typings/interface";

interface ICreateIncidentBody {
  location: number[];
  description: string;
  incidentName: string;
}

const createNewIncident = async (req: AuthRequest<ICreateIncidentBody>, res: Response) => {
  try {

    const { location, description, incidentName } = req.body;

    const { userId } = req.user as IJwtPayload;

    const newIncident = await Incident.create({
      user: userId,
      location: {
        type: "Point",
        coordinates: location
      },
      description,
      incidentName,
    });

    res.status(200).json(newIncident);

    notificationQueue.add('location', { location, description, incidentName })
  } catch (e) {
    res.status(400).json("Something terrible happened!")
  }
};

const getByUser = async (req: AuthRequest, res: Response) => {
  if (!req.user) return;

  const { userId } = req.user;

  const allIncidents = await Incident.find({ user: userId });

  res.status(200).json(allIncidents);
};

const getAllIncident = async (req: Request, res: Response) => {
  const incidents = await Incident.find();

  res.status(200).json(incidents)
}

export { createNewIncident, getByUser, getAllIncident };

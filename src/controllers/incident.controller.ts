import { Request, Response } from "express";
import { Incident } from "../models/incident.model";
import { notificationQueue } from "../process/notificationQueue";
import { AuthRequest } from "../typings/interface";

interface ICreateIncidentBody {
  location: number[];
  description: string;
  incidentName: string;
}

const createNewIncident = async (req: AuthRequest<ICreateIncidentBody>, res: Response) => {
  const { location, description, incidentName } = req.body;

  if (!req.user) {
    return res.status(401).json("Unauthorized!")
  }

  const { userId } = req.user;

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

  notificationQueue.add('location', location)
};

const getByUser = async (req: AuthRequest, res: Response) => {

  if (!req.user) {
    return res.status(401).json("Unauthorized!")
  }

  const { userId } = req.user;

  const allIncidents = await Incident.find({ user: userId });

  res.status(200).json(allIncidents);
};

export { createNewIncident, getByUser };

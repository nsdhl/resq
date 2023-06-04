import { Request, Response } from "express";
import { Incident } from "../models/incident.model";
import { IGetAuthRequest } from "../typings/interface";
import { notificationQueue } from "../process/notificationQueue";

const createNewIncident = async (req: IGetAuthRequest, res: Response) => {
  const { location, description, incidentName } = req.body;

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

const getByUser = async (req: IGetAuthRequest, res: Response) => {
  const { userId } = req.user;

  const allIncidents = await Incident.find({ user: userId });

  res.status(200).json(allIncidents);
};

export { createNewIncident, getByUser };

import { Request, Response } from "express";
import { Incident } from "../models/incident.model";

const createNewIncident = async (req: Request, res: Response) => {
  const { user, location, description, incidentName } = req.body;

  if (!user)
    res.status(400).json({
      error: "user is required!",
    });

  const newIncident = await Incident.create({
    user,
    location,
    description,
    incidentName,
  });

  res.status(200).json(newIncident);
};

const getByLocation = async (req: Request, res: Response) => {
  const { location } = req.query;

  const allIncidents = await Incident.find({ location: location });

  res.status(200).json(allIncidents);
};

const getByUser = async (req: Request, res: Response) => {
    const { user } = req.query;
  
    const allIncidents = await Incident.find({ user: user });
  
    res.status(200).json(allIncidents);
  };

export { createNewIncident, getByLocation, getByUser };

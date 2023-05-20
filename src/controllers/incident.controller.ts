import { Request, Response } from "express";
import { Incident } from "../models/incident.model";
import { IGetAuthRequest } from "../typings/interface";

const createNewIncident = async (req: IGetAuthRequest, res: Response) => {
  const { location, description, incidentName } = req.body;

  const { userId } = req.user;

  const newIncident = await Incident.create({
    user: userId,
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

const getByUser = async (req: IGetAuthRequest, res: Response) => {
  const { userId } = req.user;

  const allIncidents = await Incident.find({ user: userId });

  res.status(200).json(allIncidents);
};

const getByIncidentName = async (req: Request, res:Response) => {
  const {incidentName} = req.query;

  const allIncidents = await Incident.find({incidentName:incidentName});

  res.status(200).json(allIncidents);
};

const getByIncidentImage = async(req: Request, res:Response) =>{
  const {incidentImage} = req.query;

  const allIncidents = await Incident.find({incidentImage:incidentImage})

  res.status(200).json(allIncidents)
}


 

export { createNewIncident, getByLocation, getByUser, getByIncidentName, getByIncidentImage };

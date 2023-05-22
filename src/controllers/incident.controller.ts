import { Request, Response } from "express";
import { Incident } from "../models/incident.model";
import { IGetAuthRequest } from "../typings/interface";

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
};

const getByLocation = async (req: Request, res: Response) => {

  const { location } = req.body;

  const i = await Incident.find(
    {
      location:
      {
        $near:
        {
          $geometry: { type: "Point", coordinates: location },
          $minDistance: 10,
          $maxDistance: 1000
        }
      }
    }
  )

  res.status(200).json(i);
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

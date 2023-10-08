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

    console.log("im running")
    notificationQueue.add('notification', { location, description, incidentName })
    res.status(200).json(newIncident);
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
const getIncidents = async (req:Request, res:Response)=>{
  const incident = await Incident.find();
  const onlyIncidents = incident.filter(incident=> incident.incidentName!=="SOS")
  res.status(200).json(onlyIncidents)
}
const getSOS = async (req:Request, res:Response)=>{
  const sos = await Incident.find();
  const onlySOS = sos.filter(sos=> sos.incidentName==="SOS")
  res.status(200).json(onlySOS)
}
const deleteIncident = async (req: Request, res: Response) => { 
  const { id } = req.params;
  const incident = await Incident.findByIdAndDelete(id);
  res.status(200).json(incident)
}
const updateIncident = async (req: Request, res: Response) => {
  try{
  const {id} = req.params;
const {title, description } = req.body;
console.log(title, description, id,"data from frontend")
const incident = await Incident.findByIdAndUpdate(id, {incidentName:title, description:description}, {new: true});
res.status(200).send('incident updated')
  }catch(e){
    res.status(400).send('something went wrong');
  }

}
export { createNewIncident, getByUser, getAllIncident, getIncidents , getSOS, deleteIncident, updateIncident };

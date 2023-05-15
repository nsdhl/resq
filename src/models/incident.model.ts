import mongoose, { Schema, Types, model } from "mongoose";

interface IIncident {
  _id: Types.ObjectId;
  user: string;
  location: string;
  description: string;
  incidentName: string;
}

const incidentSchema = new Schema<IIncident>({
  user: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  incidentName: {
    type: String,
    required: [true, "Incident name is a required field!"],
  },
});

const Incident = model<IIncident>("Incident", incidentSchema);

export { Incident };

export interface IIncident {
  description: string;
  incidentName: string;
  location: TLocation;
  user: string;
  _id: string;
}

export type TLocation = {
  coordinates: number[],
  type: string
}

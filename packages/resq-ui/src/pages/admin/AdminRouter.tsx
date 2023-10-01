import {useRoutes} from "react-router-dom";
import Incident from "./Incident";
import Sos from "./Sos";
import AdminSos from "./AdminSos";
export default function AdminRouter(){
  return useRoutes([
    {
      path: "incident",
      element: 
        <Incident />
    },
    {
      path:"sos-admin",
      element:
      <AdminSos/>
    }
  ]);
}
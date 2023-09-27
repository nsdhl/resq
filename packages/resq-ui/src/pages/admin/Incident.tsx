import { useEffect, useState } from "react";
import { IIncident } from "../../types/interface";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { url } from "../../axios";
import UpdateIncident from "./UpdateIncident";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , IconButton} from "@mui/material";

const ReportPage = () => {
  interface update {
    title:string, 
    description:string,
    id:string
  }
  const [incident, setIncident] = useState<IIncident[]>([])
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<update>({
    title:'',
    description:'',
    id:''
  })
  const fetchIncident = async () => {
    const { data } = await url.get("/incident/incidents");
    setIncident(data)
    console.log(data);
  }
  useEffect(() => {
    fetchIncident()
    
  }, [])
 
const deleteIncident = async (id: string) => {
  const {data} = await url.delete(`/incident/${id}`);
  fetchIncident();
}
const sendData = (title:string, description:string, id:string) => {
   setData({
    title, description, id
  })
  setOpen(true)
}
  return (
    <>
    { open && <UpdateIncident props = {{title:data.title, description:data.description, id:data.id}}/>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Incident Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {incident.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.incidentName}
                </TableCell>
                <TableCell align="right">{row.description}</TableCell>
                <TableCell align="right">{row.location.coordinates[0]} , {row.location.coordinates[1]}</TableCell>
                <TableCell align="right">
                  
                  <IconButton>
                    <EditIcon color="error" onClick={()=>sendData(row.incidentName, row.description, row._id)}/>
                  </IconButton>
                  <IconButton onClick={()=>deleteIncident(row._id)}>
                    <DeleteIcon color="warning"/>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ReportPage

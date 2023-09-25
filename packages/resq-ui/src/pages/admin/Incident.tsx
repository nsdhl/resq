import { useEffect, useState } from "react";
import { IIncident } from "../../types/interface";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { url } from "../../axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow , IconButton} from "@mui/material";

const ReportPage = () => {
  const [incident, setIncident] = useState<IIncident[]>([])
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
  return (
    <>
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
                    <EditIcon />
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

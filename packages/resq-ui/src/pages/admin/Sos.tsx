import { useEffect, useState } from "react";
import { IIncident } from "../../types/interface";
import { url } from "../../axios";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const ReportPage = () => {
  const [incident, setIncident] = useState<IIncident[]>([])

  useEffect(() => {
    (
      async () => {
        const { data } = await url.get("/incident/sos");
        setIncident(data)
        console.log(data);
      }
    )()
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Incident Name</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Location</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ReportPage

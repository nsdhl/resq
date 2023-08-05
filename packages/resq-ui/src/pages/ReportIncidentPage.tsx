import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { url } from "../axios";

const ReportIncidentPage = () => {
  const [incident, setIncident] = useState({
    location: "",
    description: "",
    incidentName: "",
  });

  return (
    <Stack
      direction="column"
      rowGap="1.5rem"
      sx={{
        width: "50%",
        margin: "0 auto",
        p: "2rem 0rem",
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "5rem",
      }}
    >
      <img
        src="..//assets//resqlogo.png"
        alt="Report Incident"
        style={{ display: "block", margin: "0 auto", maxWidth: "200px" }}
      />
      {/* <Typography variant="h2" >Report Incident</Typography> */}
      <TextField
        onChange={(e) => {
          setIncident((prev) => {
            return {
              ...prev,
              location: e.target.value,
            };
          });
        }}
        id="location"
        label="Location"
        variant="outlined"
      />
      <TextField
        onChange={(e) => {
          setIncident((prev) => {
            return {
              ...prev,
              description: e.target.value,
            };
          });
        }}
        id="description"
        label="Description"
        variant="outlined"
      />
      <TextField
        onChange={(e) => {
          setIncident((prev) => {
            return {
              ...prev,
              incidentName: e.target.value,
            };
          });
        }}
        id="incidentName"
        label="Incident Name"
        variant="outlined"
      />

      <Button
        sx={{
          width: { xs: "100%", md: "20%" },
          margin: "0 auto",
        }}
        variant="contained"
        onClick={async () => {
          const { data } = await url.post("/incident", {
            location: [
              Number(incident.location.split(",")[0]),
              Number(incident.location.split(",")[1]),
            ],
            description: incident.description,
            incidentName: incident.incidentName,
          });
          console.log(data);
        }}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default ReportIncidentPage;

import { Box, Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { url } from "../axios";
import resqLogo from "../assets/resqlogo.png"
import MapComponent from "../components/Map";
import When from "../hoc/When";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ReportIncidentPage = () => {

  const navigate = useNavigate()

  const [incident, setIncident] = useState({
    location: "",
    description: "",
    incidentName: "",
  });

  const [showModal, setShowModal] = useState(false)

  const [l, setL] = useState<{ lat: string; lng: string; }>()

  return (
    <>
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
          src={resqLogo}
          alt="Report Incident"
          style={{ display: "block", margin: "0 auto", maxWidth: "200px" }}
        />
        {/* <Typography variant="h2" >Report Incident</Typography> */}
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

        <Stack direction="row" justifyContent="center" border="2px solid black" sx={{
          borderStyle: "dashed",
          p: "4px",
          cursor: "pointer"
        }} onClick={() => setShowModal(true)}>
          <When condition={l !== undefined}>
            <Typography variant="body1">{l?.lat},{l?.lng}</Typography>
          </When>
          <When condition={l === undefined}>
            <Typography variant="body1">Click to locate on map</Typography>
          </When>
        </Stack>

        <Button
          sx={{
            width: { xs: "100%", md: "20%" },
            margin: "0 auto",
          }}
          variant="contained"
          onClick={async () => {
            await url.post("/incident", {
              location: [
                l?.lat, l?.lng
              ],
              description: incident.description,
              incidentName: incident.incidentName,
            });
            toast.success("Your incident has been posted!")
            navigate("/")
          }}
        >
          Submit
        </Button>
      </Stack>
      <Dialog onClose={() => setShowModal(false)} open={showModal}>
        <Box sx={{
          width: "100vw",
          height: "100vh"
        }}>
          <MapComponent hideIncident={true} getPosition={(p) => {
            setL(p)
          }} />
        </Box>
      </Dialog>
    </>
  );
};

export default ReportIncidentPage;

import { Stack } from '@mui/material'
import { url } from '../axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SoSPage = () => {
  const navigate = useNavigate();

  const initiateSoS = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    async function successFunction(position: any) {
      console.log("position", position);
      const res = await url.post("/incident", {
        location: [
          parseFloat(position.coords.latitude),
          parseFloat(position.coords.longitude)
        ],
        description: "SOS",
        incidentName: "SOS",
      });
      console.log("res", res)
      toast.success("Your incident has been posted!")
      navigate("/")
    }

    function errorFunction() {
      console.log("Unable to retrieve your location.");
    }
  }

  return (
    <Stack direction="row" sx={{
      justifyContent: "center",
      background: "red",
      width: "200px",
      height: "50px",
      margin: "0 auto",
      marginTop: "20rem",
      borderRadius: "12px",
      cursor: "pointer"
    }} onClick={() => initiateSoS()}>
      SOS
    </Stack>
  )
}

export default SoSPage

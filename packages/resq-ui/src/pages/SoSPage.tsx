import { Stack, TextField } from '@mui/material'
import { url } from '../axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SoSPage = () => {
  const [description, setDescription] = useState('')
  const navigate = useNavigate();

  const initiateSoS = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    async function successFunction(position: any) {
      const res = await url.post("/sos", {
        location: [
          parseFloat(position.coords.latitude),
          parseFloat(position.coords.longitude)
        ],
        description:description
      });
      console.log("res", res)
      toast.success("Your SoS has been posted!")
      navigate("/")
    }

    function errorFunction() {
      console.log("Unable to retrieve your location.");
    }
  }

  return (
    <>
    <Stack direction="row" sx={{
      justifyContent: "center",
      alignItems: "center",
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

    <TextField
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="username"
          label="SOS Message"
          variant="outlined"
          size="medium"
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            },
          }}
        />
    </>
  )
}

export default SoSPage

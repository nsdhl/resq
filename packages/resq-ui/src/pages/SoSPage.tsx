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
      width: "300px",
      flexDirection: "column",
      gap:'2rem',
      height: "50px",
      margin: "0 auto",
      marginTop: "20rem",
      borderRadius: "12px",
      cursor: "pointer"
    }}>
      
      <h1 style={{fontSize:'35px', fontWeight:'bold', color:'#d90429'}}>SOS Asistance</h1>
      <p>Please use SOS feature incase of Emergency</p>

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
            mt: 2,
            width: "100%",
            "& .MuiOutlinedInput-root": {
              width: "100%",
            },
          }}
        />
        <button style={{padding:'10px', fontSize:'18px', width:'100%', background:'#d90429', color:'white', fontWeight:'bold', borderRadius:"8px", border:'none', cursor:"pointer"}} onClick={()=>initiateSoS()}>
        SOS <i className="fas fa-exclamation-triangle"></i>
      </button>
            </Stack>
    </>
  )
}

export default SoSPage

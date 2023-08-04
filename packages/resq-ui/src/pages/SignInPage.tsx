import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { url } from '../axios';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {

  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    username: "",
    password: "",
  })


  return (
    <Stack direction="column" rowGap="1.33rem" sx={{
      width: "80%",
      justifyContent: "center",
      margin: "0 auto",
      p: "1.5rem 0rem"
    }}>
      <Typography variant="h2">Sign In</Typography>
      <TextField onChange={(e) => {
        setCredential(prev => {
          return {
            ...prev,
            username: e.target.value
          }
        })
      }} id="username" label="Username" variant="standard" />
      <TextField
        onChange={(e) =>
          setCredential(prev => {
            return {
              ...prev,
              password: e.target.value
            }
          })
        }
        id="password" label="Password" variant="standard" />
      <Button sx={{
        width: {
          xs: "100%",
          md: "50%"
        },
        margin: "0 auto"
      }} variant="contained" onClick={async () => {
        const { data } = await url.post("/user/login", {
          username: credential.username,
          password: credential.password
        })
        localStorage.setItem("user", JSON.stringify(data))
        navigate("/report")
      }}>Proceed</Button>
    </Stack>
  )
}

export default SignInPage

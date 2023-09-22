import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { url } from "../axios";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

  return (
    <Stack
      direction="column"
      rowGap="1.33rem"
      sx={{
        width: "40%",
        justifyContent: "center",
        margin: "0 auto",
        p: "1.5rem 0rem",
        backgroundColor: "#f7f7f7",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginTop: "5rem",

      }}
    >

<img
        src="..//assets//resqlogo.png"
        alt="Sign In"
        style={{ display: "block", margin: "0 auto", maxWidth: "200px" }}
      />

      {/* <Typography variant="h2" sx={{ textAlign: "center" }}>Sign In</Typography> */}
      
      <TextField
        onChange={(e) => {
          setCredential((prev) => {
            return {
              ...prev,
              username: e.target.value,
            };
          });
        }}
        id="username"
        label="Username"
        variant="outlined"
        size="medium" 
        fullWidth 
        sx={{
          mb: 2, 
          "& .MuiOutlinedInput-root": {
            width: "100%", 
            marginLeft: "auto", 
            marginRight: "auto", 
          },
        }}
      />
      <TextField
        onChange={(e) =>
          setCredential((prev) => {
            return {
              ...prev,
              password: e.target.value,
            };
          })
        }
        id="password"
        label="Password"
        variant="outlined"
        // type="password" 
        size="medium" 
        fullWidth 
        sx={{
          mb: 2, 
          "& .MuiOutlinedInput-root": {
            width: "100%", 
            marginLeft: "auto", 
            marginRight: "auto", 
          },
        }}
      />
      <Button
        sx={{
          width: {
            xs: "100%",
            md: "30%",
          },
          margin: "0 auto",
        }}
        variant="contained"
        onClick={async () => {
          const { data } = await url.post("/user/login", {
            username: credential.username,
            password: credential.password,
          });
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/report");
        }}
      >
        Proceed
      </Button>
    </Stack>
  );
};

export default SignInPage;

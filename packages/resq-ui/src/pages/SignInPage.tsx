import { Box, Button, Dialog, Stack, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { url } from "../axios";
import { useNavigate } from "react-router-dom";
import resqLogo from "../assets/resqlogo.png"
import When from "../hoc/When";
import MapComponent from "../components/Map";
import { toast } from "react-hot-toast";
import { Link } from '@mui/material';

interface ISignInPage {
  isSignUp: boolean;
}

const SignInPage: FC<ISignInPage> = ({ isSignUp }) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false)

  const [l, setL] = useState<{ lat: string; lng: string; }>({
    lat: "",
    lng: ""
  })

  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });

  return (
    <>
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
          src={resqLogo}
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

        <When condition={isSignUp}>
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
        </When>

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
            if (isSignUp) {
              try {
                await url.post("/user/register", {
                  username: credential.username,
                  password: credential.password,
                  location: [parseFloat(l.lat), parseFloat(l.lng)]
                })
                toast.success("Your account is created!")
                navigate("/")
              } catch (e: any) {
                toast.error(e.response.data.error)
              }
            } else {
              const { data } = await url.post("/user/login", {
                username: credential.username,
                password: credential.password,
              });
              localStorage.setItem("user", JSON.stringify(data));
              navigate("/report ");
            }
          }}
        >
          Proceed
        </Button>

        <Typography variant="caption" textAlign="center" sx={{
          cursor: "pointer"
        }} onClick={() => {
          navigate("/signup")
        }}>New? Create an account</Typography>
      </Stack>

       {/* <Typography variant="body2"  color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ResQ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography> */}
  
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

export default SignInPage;

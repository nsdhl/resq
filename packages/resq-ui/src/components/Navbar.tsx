import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { ErrorOutline, Home, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { registerServiceWorker, subscribe } from "../helpers/registerSw";
import When from "../hoc/When";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") as string);

  const notification = async () => {
    try {
      const serviceWorkerReg = await registerServiceWorker();
      await subscribe(serviceWorkerReg);
    } catch (e) {
      console.log(e);
    }
  };

  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#b5b7ba",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            {/* <Menu /> */}
          </IconButton>
          <Button
            onClick={notification}
            variant="contained"
            color="info"
            size="small"
            sx={{
              fontSize: "12px",
              color: "white",
            }}
          >
            Turn On Notification
          </Button>
          <Box sx={{
            cursor: "pointer"
          }} onClick={() => {
            navigate("/")
          }} m="0rem 2.5rem">
            <Home />
          </Box>
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="center"
            columnGap="2rem"
            sx={{
              width: "100%",
            }}
          >
            <Button
              onClick={() => {
                if (user) {
                  return navigate("/report");
                }
                navigate("/signin");
              }}
              variant="contained"
              endIcon={<ErrorOutline />}
              color="error"
              sx={{
                borderRadius: "100px",
              }}
            >
              Report Incident
            </Button>

            <Button
              onClick={() => {
                if (user) {
                  return navigate("/sos");
                }
                navigate("/signin");
              }}
              variant="contained"
              endIcon={<ErrorOutline />}
              color="error"
              sx={{
                borderRadius: "100px",
              }}
            >
              SOS
            </Button>

            <Button
              onClick={() => {
                navigate("/generate-report")
              }}
              variant="contained"
              endIcon={<ErrorOutline />}
              color="error"
              sx={{
                borderRadius: "100px",
              }}
            >
              Report
            </Button>

            <When condition={!!user}>
              <Logout onClick={() => {
                localStorage.removeItem("user")
                navigate("")
              }} />
            </When>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

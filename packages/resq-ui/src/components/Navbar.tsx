import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { registerServiceWorker, subscribe } from "../helpers/registerSw";

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
          <Stack
            direction="row"
            justifyContent="right"
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
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

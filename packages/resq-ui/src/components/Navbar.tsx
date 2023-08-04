import { AppBar, Box, Button, IconButton, Stack, Toolbar } from '@mui/material'
import { ErrorOutline, Menu } from "@mui/icons-material"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") as string)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            < Menu />
          </IconButton>
          <Stack direction="row" justifyContent="right" sx={{
            width: "100%"
          }}>
            <Button onClick={() => {
              if (user) {
                return navigate('/report')
              }
              navigate('/signin')
            }
            } variant="contained" endIcon={<ErrorOutline />} color="error" sx={{
              borderRadius: "100px",
            }}>Report Incident</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar

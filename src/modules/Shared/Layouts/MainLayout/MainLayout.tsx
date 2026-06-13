import Box from "@mui/material/Box";
import NavBar from "../../NavBar/NavBar";
import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { Button } from "@mui/material";


export default function AdminLayout() {

  const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const logout = () => {
      localStorage.removeItem("token");
      authContext?.setUserData(null);
      navigate("/auth");
  };
    
  return (
    <>
        <Grid>
          <Box sx={{flex: 1, minWidth: 0, overflow:'auto',px: 2}} >
            <NavBar/>
            <Outlet/>
            <Button variant="contained" size="large" onClick={logout}>logout</Button>
          </Box>
        </Grid>
    </>
  )
}

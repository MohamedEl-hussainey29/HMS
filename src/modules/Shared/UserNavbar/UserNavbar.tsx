import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export default function UserNavbar() {
  
  const navigate = useNavigate();
    const authContext = useContext(AuthContext);
    const logout = () => {
      localStorage.removeItem("token");
      authContext?.setUserData(null);
      navigate("/auth");
  };

  return (
    <>
        <Grid sx={{display:'flex',justifyContent:'space-between' , alignItems:'center', py:1 , px: 2}}>
            <Typography variant="h5" sx={{fontWeight: 500, ml: 5}}>
                <Box component="span" sx={{ color: "#365CF5" }}>Stay</Box>
                <Box component="span" sx={{ color: "black" }}>cation.</Box>
            </Typography>
            <Box>
              <Button variant="contained" size="large" onClick={()=>navigate("/explore-rooms")}>Explore Rooms</Button>
              <Button variant="contained" size="large" onClick={logout} sx={{ml: 1}}>logout</Button>
            </Box>
        </Grid>
        <Divider/>
    </>

  )
}

    

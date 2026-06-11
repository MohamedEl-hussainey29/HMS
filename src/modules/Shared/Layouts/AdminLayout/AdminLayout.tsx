import Box from "@mui/material/Box";
import NavBar from "../../NavBar/NavBar";
import Grid from "@mui/material/Grid";
import SideBar from "../../SideBar/SideBar";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {
    
  return (
    <>
      <Box >
        <Grid sx={{display:"flex" , overflow:"hidden" , height : "100vh"}}>
          <Box sx={{bgcolor:'blue',height: '100%', flexShrink: 0 }}>
            <SideBar/>
          </Box>

          <Box sx={{flex: 1, minWidth: 0, overflow:'auto',px: 2}} >
            <NavBar/>
            <Outlet/>
          </Box>
        </Grid>
      </Box>
    </>
  )
}

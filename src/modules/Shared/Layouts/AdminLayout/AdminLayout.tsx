import Box from "@mui/material/Box";
import NavBar from "../../NavBar/NavBar";
import Grid from "@mui/material/Grid";
import SideBar from "../../SideBar/SideBar";
import { Outlet } from "react-router-dom";


export default function AdminLayout() {
    
  return (
    <>
      <Box >
        <Grid sx={{display:"flex" , overflow:"hidden" , height : 'calc(100vh - 70px)'}}>
          <Box sx={{bgcolor:'blue',height: '100%', flexShrink: 0}}>
            <SideBar/>
          </Box>

          <Box sx={{overflow:'auto'}} >
            <NavBar/>
            <Outlet/>
          </Box>
        </Grid>
      </Box>
    </>
  )
}

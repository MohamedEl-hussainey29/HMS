import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";
import UserNavbar from "../../UserNavbar/UserNavbar";
import { Box, Grid } from "@mui/material";


export default function AdminLayout() {
    
  return (
    <>
        <Grid>
          <Box sx={{flex: 1, minWidth: 0, overflow:'auto'}} >
            <UserNavbar/>
            <Box sx={{px: 2 , mt: 2}}>
              <Outlet/>
              <Footer/>
            </Box>
          </Box>
        </Grid>
    </>
  )
}

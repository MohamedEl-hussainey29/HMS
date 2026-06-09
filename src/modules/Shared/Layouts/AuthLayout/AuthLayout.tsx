import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation } from "react-router-dom";
import loginImg from "../../../../assets/images/Login.png";
import registerImg from "../../../../assets/images/register-verify.png";
import forgetImg from "../../../../assets/images/forget-reset.png";




export default function AuthContext() {

  const { pathname } = useLocation();
  const getAuthContent = () => {
    switch (pathname) {
      case "/auth/login":
        return {
          image: loginImg,
          title: "Sign in to Roamhome",
        };

      case "/auth/register":
        return {
          image: registerImg,
          title: "Sign up to Roamhome",
        };
      
      case "/auth/verify-account":
        return {
          image: registerImg,
          title: "Verify Account",
        };

      case "/auth/forget-pass":
        return {
          image: forgetImg,
          title: "Forgot Password",
        };
      
      case "/auth/reset-pass":
        return {
          image: forgetImg,
          title: "Reset Password",
        };

      case "/auth/change-pass":
        return {
          image: loginImg,
          title: "Change Password",
        };

      default:
        return {
          image: loginImg,
          title: "Welcome Back",
        };
    }
  };
  const authContent = getAuthContent();

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: {
          xs : 'auto',
          md : 'hidden'
        },
        bgcolor: "#fff",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Typography variant="h5" sx={{position: "fixed",top: 25,left: 25,fontWeight: 500}}>
        <Box component="span" sx={{ color: "#365CF5" }}>Stay</Box>
        <Box component="span" sx={{ color: "black" }}>cation.</Box>
      </Typography>
      <Grid container sx={{ height: "100%" }}>
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            px: { xs: 2, md: 8 },
            mt: 5
          }}
        >

          <Box sx={{width: "100%",maxWidth: 420,flexShrink: 1, mx: 'auto'}}>

            <Outlet />
          </Box>
        </Grid>
        <Grid
          size={{ xs: 0, md: 6 }}
          sx={{
            display: { xs: "none", md: "block" },
            height: "100%",
          }}
        >
          <Box sx={{position: "relative",height: "100%",borderRadius: 4,overflow: "hidden"}}>
            <Box
              component="img"
              src={authContent.image}
              alt="auth"
              sx={{ width: "100%", height: "100%", objectFit: "cover"}}
            />
            <Box sx={{ position: "absolute", left: 100, bottom: 40, color: "#fff"}} >
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>{authContent.title}</Typography>
              <Typography variant="h6">Homes as unique as you.</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import notFoundImg from "../../../assets/images/notfound image.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: 6,
          backgroundImage: {
            xs: "none",
            md: `url(${notFoundImg})`,
          },
          backgroundRepeat: "no-repeat",
          backgroundPosition: {
            xs: "center",
            md: "right center",
          },
          backgroundSize: {
            md: "80%",
          },
        }}
      >
        <Box
          sx={{
            px: 4,
            py: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            <Box component="span" sx={{ color: "#365CF5" }}>
              Stay
            </Box>
            <Box component="span">cation.</Box>
          </Typography>
        </Box>

        <Container maxWidth="xl" sx={{ mx: "auto" }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
            }}
            spacing={6}
          >
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  color: "#203FC7",
                  fontSize: { xs: "90px", md: "140px" },
                  lineHeight: 1,
                }}
              >
                404
              </Typography>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: "#1F263E",
                }}
              >
                Oops! Page Not Found
              </Typography>

              <Typography
                sx={{
                  color: "#7E7E7E",
                  maxWidth: 430,
                  mb: 5,
                  lineHeight: 1.8,
                }}
              >
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </Typography>

              <Button
                variant="contained"
                size="large"
                startIcon={<ArrowBackIcon />}
                onClick={() => 
                {
                  if(window.history.length > 1){
                    navigate(-1);
                  } else{
                    navigate('/dashboard');
                  }
                }
                }
                sx={{
                  bgcolor: "#203FC7",
                  px: 5,
                  py: 1.5,
                  borderRadius: "12px",
                  textTransform: "none",
                  fontWeight: 600,
                }}
              >
                Back
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

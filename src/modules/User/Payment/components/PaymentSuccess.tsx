import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import successImg from "../../../../assets/images/paymentSuccess.png";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        maxWidth: 460,
        mx: "auto",
      }}
    >
      <Typography
        sx={{
          color: "#152C5B",
          fontWeight: 500,
          fontSize: { xs: "2rem", sm: "2rem", md: "2rem" },
          mb: { xs: 2, md: 2 },
        }}
      >
        Yay! Completed
      </Typography>

      <Box
        component="img"
        src={successImg}
        sx={{
          width: { xs: "230px", sm: "225px", md: "220px" },
          height: { xs: "210px", sm: "205px", md: "200px" },
          objectFit: "contain",
          mb: { xs: 2, md: 2 },
        }}
      />

      <Typography
        sx={{
          color: "#B0B0B0",
          lineHeight: 1.6,
          fontSize: { xs: "1rem", sm: "1rem", md: "1rem" },
          mb: { xs: 3, md: 3 },
        }}
      >
        We will inform you via email later
        <br />
        once the transaction has been accepted
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate("/")}
        sx={{
          width: { xs: "100%", sm: 200 },
          maxWidth: 220,
          height: { xs: 48, md: 42 },
          borderRadius: "4px",
          bgcolor: "#3252DF",
          textTransform: "none",
          fontSize: { xs: "1rem", md: "0.95rem" },
          fontWeight: 500,
          boxShadow: "0px 8px 15px rgba(50,82,223,0.3)",
          "&:hover": {
            bgcolor: "#2749d7",
          },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}
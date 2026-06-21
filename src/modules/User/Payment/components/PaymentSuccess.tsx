import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import successImg from '../../../../assets/images/paymentSuccess.png';

export default function PaymentSuccess() {
 const navigate = useNavigate();

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#152C5B",
          fontWeight: 500,
          mb: 3,
        }}
      >
        Yay! Completed
      </Typography>

      <Box
        component={'img'}
        src={successImg}
        sx={{
          width: '362px',
          height: '330px',
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}/>

      <Typography
        sx={{
          color: "#B0B0B0",
          textAlign: "center",
          lineHeight: 1.8,
          fontSize: "18px",
          mb: 3,
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
          width: 210,
          height: 50,
          borderRadius: "4px",
          bgcolor: "#3252DF",
          textTransform: "none",
          fontSize: "18px",
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
  );}

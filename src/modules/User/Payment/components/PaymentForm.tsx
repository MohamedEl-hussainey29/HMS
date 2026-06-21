import PaymentStepper from "./PaymentStepper";
import { Box, Divider, Typography, Grid, Container } from "@mui/material";
import PaymentSummary from "./PaymentSummary";
import FormInfo from "./FormInfo";
import PaymentSuccess from "./PaymentSuccess";
import { useState } from "react";

export default function PaymentForm() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: 500, textAlign: "center", my: 2 }}
      >
        <Box component="span" sx={{ color: "#365CF5" }}>
          Stay
        </Box>
        <Box component="span" sx={{ color: "black" }}>
          cation.
        </Box>
      </Typography>

      <Divider />

      <Container maxWidth="md">
        <PaymentStepper completed={paymentSuccess}/>

        {paymentSuccess ? (<PaymentSuccess/>) : (
          <>
         <Box sx={{ textAlign: "center", my: 4 }}>
        <Typography variant="h4" color="primary">
          Payment
        </Typography>

        <Typography sx={{ color: "#B0B0B0", mt: 1 }}>
          Kindly follow the instructions below
        </Typography>
      </Box>

      <Grid container spacing={3} sx={{ justifyContent: 'center', alignItems: 'flex-start'}}>
        <Grid size={{ xs: 12, md: 5 }}>
          <PaymentSummary />
        </Grid>

        <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ bgcolor: "#E5E5E5" }}
                />
                
        <Grid size={{ xs: 12, md: 5 }}>
          <FormInfo onPaymentSuccess={() => setPaymentSuccess(true)}/>
        </Grid>
      </Grid>
        </>)}

      </Container>
    </>
  );
}

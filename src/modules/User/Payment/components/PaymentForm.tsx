// PaymentForm.tsx
import PaymentStepper from "./PaymentStepper";
import { Box, Divider, Typography, Grid, Container } from "@mui/material";
import PaymentSummary from "./PaymentSummary";
import FormInfo from "./FormInfo";
import PaymentSuccess from "./PaymentSuccess";
import { useState } from "react";

export default function PaymentForm() {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: { xs: "auto", md: "hidden" },
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          py: { xs: 1, md: 1.5 },
          fontSize: { xs: "1.1rem", md: "1.4rem" },
          flexShrink: 0,
        }}
      >
        <Box component="span" sx={{ color: "#365CF5" }}>
          Stay
        </Box>
        <Box component="span" sx={{ color: "black" }}>
          cation.
        </Box>
      </Typography>

      <Divider sx={{ flexShrink: 0 }} />

      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          py: { xs: 1, md: 2 },
        }}
      >
        <Box sx={{ flexShrink: 0 }}>
          <PaymentStepper completed={paymentSuccess} />
        </Box>

        {paymentSuccess ? (
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PaymentSuccess />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ textAlign: "center", flexShrink: 0, mb: { xs: 1, md: 2 } }}>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontSize: { xs: "1.1rem", md: "1.5rem" } , mt: 2 }}
              >
                Payment
              </Typography>

              <Typography sx={{ color: "#B0B0B0", fontSize: { xs: "0.75rem", md: "0.9rem" } }}>
                Kindly follow the instructions below
              </Typography>
            </Box>

            <Grid
              container
              spacing={2}
              sx={{
                flex: 1,
                minHeight: 0,
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              <Grid size={{ xs: 12, md: 5 }} sx={{ minHeight: 0 }}>
                <PaymentSummary />
              </Grid>

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ bgcolor: "#E5E5E5", display: { xs: "none", md: "block" } }}
              />

              <Grid size={{ xs: 12, md: 5 }} sx={{ minHeight: 0 }}>
                <FormInfo onPaymentSuccess={() => setPaymentSuccess(true)} />
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}
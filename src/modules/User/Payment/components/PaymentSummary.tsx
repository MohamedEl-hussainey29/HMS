import { Box, Paper, Stack, Typography } from "@mui/material";
import BCAimg from "../../../../assets/images/BCAbank.png";
import MandiriImg from "../../../../assets/images/mandiriBank.png";

export default function PaymentSummary() {
  const bookingSummary = JSON.parse(
    localStorage.getItem("bookingSummary") ?? "{}",
  );
  const { totalPrice = 0 } = bookingSummary;
  const tax = Math.round(totalPrice * 0.14);
  const totalAfterTax = totalPrice + tax;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        height: "100%",
      }}
    >
      <Typography sx={{ mb: 2, fontSize: "18px" }} variant="subtitle2">
        Transfer Pembayaran:
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "120px auto",
          rowGap: 1,
        }}
      >
        <Typography
          color="primary"
          sx={{ fontSize: "18px", fontWeight: "bold" }}
        >
          Tax:
        </Typography>
        <Typography>14%</Typography>

        <Typography
          color="primary"
          sx={{ fontSize: "18px", fontWeight: "bold" }}
        >
          Sub Total:
        </Typography>
        <Typography>${totalPrice}</Typography>

        <Typography
          color="primary"
          sx={{ fontSize: "18px", fontWeight: "bold" }}
        >
          Total:
        </Typography>
        <Typography>${totalAfterTax}</Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mt: 3 }}>
        <Box component={"img"} src={BCAimg} />

        <Box>
          <Typography>Bank Central Asia</Typography>
          <Typography variant="body2" color="text.secondary">
            2208 1996
          </Typography>
          <Typography variant="body2" color="text.secondary">
            BuildWith Angga
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center", mt: 2 }}>
        <Box component={"img"} src={MandiriImg} />

        <Box>
          <Typography>Bank Mandiri</Typography>
          <Typography variant="body2" color="text.secondary">
            2208 1996
          </Typography>
          <Typography variant="body2" color="text.secondary">
            BuildWith Angga
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

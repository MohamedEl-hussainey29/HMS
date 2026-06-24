// FormInfo.tsx
import { Box, TextField, InputLabel, Stack, Button, CircularProgress } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentAPI } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

interface FormInfoProps {
  onPaymentSuccess: () => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "14px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

export default function FormInfo({ onPaymentSuccess }: FormInfoProps) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { bookingId } = useParams();
  const [submitLoading , setSubmitLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setSubmitLoading(true)

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    try {
      const { token, error: tokenError } =
        await stripe.createToken(cardElement);
      if (tokenError) {
        console.error(tokenError);
      }

      if (!token) {
        console.error("Failed to create token");
        return;
      }

      if (!bookingId) {
        console.error("Booking id not found");
        return;
      }

      const response = await PaymentAPI.PayBooking(bookingId!, {
        token: token?.id,
      });

      if (response.data.success) {
        localStorage.removeItem("bookingSummary");
        toast.success(response.data.message);
        onPaymentSuccess();
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Payment failed");
      } else {
        toast.error("Something went wrong");
      }
    }finally{
      setSubmitLoading(false)
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: { xs: 1.5, md: 2 },
        height: { md: "100%" },
      }}
    >
      <Stack spacing={0.5}>
        <InputLabel htmlFor="userName" className="form-label" sx={{ fontSize: "0.8rem" }}>
          User Name
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          id="userName"
          variant="filled"
          placeholder="Type here"
          sx={{ mb: 1, "& .MuiFilledInput-root": { py: 0.5 } }}
        />

        <InputLabel htmlFor="bankName" className="form-label" sx={{ fontSize: "0.8rem" }}>
          Bank Name
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          id="bankName"
          variant="filled"
          placeholder="Type here"
          sx={{ mb: 1, "& .MuiFilledInput-root": { py: 0.5 } }}
        />

        <InputLabel htmlFor="senderName" className="form-label" sx={{ fontSize: "0.8rem" }}>
          Sender Name
        </InputLabel>
        <TextField
          size="small"
          fullWidth
          id="senderName"
          variant="filled"
          placeholder="Type here"
          sx={{ mb: 1, "& .MuiFilledInput-root": { py: 0.5 } }}
        />

        {/* payment card */}
        <InputLabel htmlFor="card-element" className="form-label" sx={{ fontSize: "0.8rem" }}>
          Card Details
        </InputLabel>
        <Box
          sx={{
            border: "1px solid #E5E5E5",
            borderRadius: 1,
            p: 1.2,
            bgcolor: "#F5F5F5",
          }}
        >
          <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ pt: { xs: 1.5, md: 2 }, mt: { xs: 3 , md: "auto" } , mb: 5 , justifyContent: {xs: "center" , md: "flex-start"}}}
      >
        <Button variant="outlined"  onClick={() => navigate(-1)}>
          Cancel
        </Button>

        <Button variant="contained" type="submit" >
          {submitLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                justifyContent: "center",
              }}
            >
              <CircularProgress size="20px" sx={{ color: "#fff" }} /> Processing...
            </Box>
          ) : (
            "Continue Book"
          )}
        </Button>
      </Stack>
    </Box>
  );
}
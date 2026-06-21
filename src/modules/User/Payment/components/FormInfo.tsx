import { Box, TextField, InputLabel, Stack, Button } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentAPI } from "../../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

interface FormInfoProps {
  onPaymentSuccess: () => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

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
    }
  };

  return (
    <>
      <Box component={"form"} sx={{ p: 4 }} onSubmit={handleSubmit}>
        <Stack>
          <InputLabel htmlFor="userName" className="form-label">
            User Name
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            id="userName"
            variant="filled"
            placeholder="Type here"
            sx={{ mb: 2 }}
          />

          <InputLabel htmlFor="bankName" className="form-label">
            Bank Name
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            id="bankName"
            variant="filled"
            placeholder="Type here"
            sx={{ mb: 2 }}
          />

          <InputLabel htmlFor="senderName" className="form-label">
            Sender Name
          </InputLabel>
          <TextField
            size="small"
            fullWidth
            id="senderName"
            variant="filled"
            placeholder="Type here"
            sx={{ mb: 2 }}
          />
          {/* payment card */}
          <InputLabel htmlFor="card-element" className="form-label">
            Card Details
          </InputLabel>
          <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
        </Stack>
        <Stack sx={{ mt: 6 }} direction="row" spacing={2}>
          <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>

          <Button variant="contained" type="submit">
            Continue to Book
          </Button>
        </Stack>
      </Box>
    </>
  );
}

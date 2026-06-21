/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import type { BookingCardProps } from "../Types/types";
import { useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useBooking } from "../../../../../../context/BookingContext";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { BookingsAPI } from "../../../../../../api";
import { AuthContext } from "../../../../../../context/AuthContext";
import AuthRequiredDialog from "../../../../../Shared/AuthRequiredDialog/AuthRequiredDialog";

interface BookingForm {
  startDate: string;
  endDate: string;
}

export default function BookingCard({
  roomId,
  price,
  discount,
}: BookingCardProps) {
  const { startDate, endDate, setStartDate, setEndDate } = useBooking();
  const { userData }: any = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingForm>({
    defaultValues: { startDate, endDate },
  });

  const { onChange: onStartDateChange, ...startDateRest } = register(
    "startDate",
    {
      required: "Start date is required",
    },
  );
  const { onChange: onEndDateChange, ...endDateRest } = register("endDate", {
    required: "End date is required",
    validate: (value, formValues) =>
      new Date(value) > new Date(formValues.startDate) ||
      "End date must be after start date",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { nights, discountedPrice, totalPrice } = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const nights = Math.max(
      1,
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)),
    );

    const discountedPrice = Math.round(
      discount > 0 ? Number((price * (1 - discount / 100)).toFixed(2)) : price,
    );

    const totalPrice = Number(Math.round(discountedPrice * nights));

    return {
      nights,
      discountedPrice,
      totalPrice,
    };
  }, [startDate, endDate, price, discount]);

  const formattedPrice = new Intl.NumberFormat("en-US").format(price);
  const formattedDiscountedPrice = new Intl.NumberFormat("en-US").format(
    discountedPrice,
  );

  const onSubmit = async (data: BookingForm) => {
    if (!userData) {
      setAuthDialogOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await BookingsAPI.CreateBooking({
        startDate: data.startDate,
        endDate: data.endDate,
        room: roomId,
        totalPrice,
      });
      toast.success("Booking created successfully!");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to create booking, try again",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBooking = async () => {
    try {
      const response = await BookingsAPI.CreateBooking({
        startDate,
        endDate,
        room: id!,
        totalPrice,
      });
      toast.success(response.data.message);
      const bookingId = response.data.data.booking._id;

      const bookingSummary = {
        totalPrice: response.data.data.booking.totalPrice,
      };
      localStorage.setItem("bookingSummary", JSON.stringify(bookingSummary));

      toast.success(response.data.message);
      navigate(`/payment/${bookingId}`);
    } catch (error) {
      console.log(error);
      toast.error("Booking failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        p: { xs: 3, sm: 4, md: 6 },
        border: "1px solid #E5E5E5",
        borderRadius: "15px",
        width: { xs: "100%", sm: "420px", md: "500px" },
        maxWidth: "100%",
      }}
    >
      <Box sx={{ mb: 5 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "18px", md: "20px" },
            mb: 3,
            color: "#152C5B",
          }}
        >
          Start Booking
        </Typography>

        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            fontSize: { xs: "28px", sm: "32px", md: "36px" },
            fontWeight: 300,
          }}
        >
          {discount > 0 && (
            <Box
              component="span"
              sx={{
                color: "#B0B0B0",
                textDecoration: "line-through",
                fontSize: { xs: "16px", md: "20px" },
              }}
            >
              ${formattedPrice}
            </Box>
          )}

          <Box
            component="span"
            sx={{
              color: "#1ABC9C",
              fontSize: { xs: "28px", sm: "32px", md: "36px" },
              fontWeight: 600,
            }}
          >
            ${formattedDiscountedPrice}
          </Box>

          <Box
            component="span"
            sx={{
              color: "#B0B0B0",
              fontSize: { xs: "16px", sm: "20px", md: "24px" },
            }}
          >
            per night
          </Box>
        </Typography>

        {discount > 0 && (
          <Typography sx={{ color: "#FF1612", fontWeight: 400 }}>
            Discount {discount}% Off
          </Typography>
        )}
      </Box>

      <Box sx={{ pt: 5 }}>
        <Typography sx={{ color: "#152C5B", fontWeight: 400, pb: 1 }}>
          Booking Dates
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "stretch",
            border: "1px solid #E5E5E5",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              bgcolor: "#3252DF",
              px: 1.8,
              py: { xs: 1, sm: 0 },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CalendarMonthIcon sx={{ color: "#fff", fontSize: "1.4rem" }} />
          </Box>

          <TextField
            type="date"
            defaultValue={startDate}
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
            sx={{
              flex: 1,
              minWidth: 0,
              "& input": {
                px: 1.5,
                py: 1.3,
                fontSize: { xs: "0.78rem", md: "0.88rem" },
                color: "#14183E",
                width: "100%",
              },
            }}
            error={!!errors?.startDate}
            helperText={errors?.startDate?.message}
            {...startDateRest}
            onChange={(e) => {
              setStartDate(e.target.value);
              onStartDateChange(e);
            }}
          />

          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ display: { xs: "none", sm: "block" } }}
          />
          <Divider
            orientation="horizontal"
            variant="middle"
            sx={{ display: { xs: "block", sm: "none" } }}
          />

          <TextField
            type="date"
            defaultValue={endDate}
            variant="standard"
            slotProps={{ input: { disableUnderline: true } }}
            sx={{
              flex: 1,
              minWidth: 0,
              "& input": {
                px: 1.5,
                py: 1.3,
                fontSize: { xs: "0.78rem", md: "0.88rem" },
                color: "#14183E",
                width: "100%",
              },
            }}
            error={!!errors?.endDate}
            helperText={errors?.endDate?.message}
            {...endDateRest}
            onChange={(e) => {
              setEndDate(e.target.value);
              onEndDateChange(e);
            }}
          />
        </Box>

        <Typography sx={{ color: "#B0B0B0", mt: 2 }}>
          You will pay{" "}
          <Box component={"span"} sx={{ color: "#152C5B" }}>
            {" "}
            ${totalPrice} USD{" "}
          </Box>{" "}
          per{" "}
          <Typography component={"span"} sx={{ color: "#152C5B" }}>
            {nights} {nights === 1 ? "Night" : "Nights"}
          </Typography>
        </Typography>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            onClick={handleBooking}
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              bgcolor: "#3252DF",
              px: 5,
              fontSize: "18px",
              textTransform: "none",
              width: { xs: "100%", sm: "auto" },
              "&.Mui-disabled": {
                bgcolor: "#3252DF",
                color: "#fff",
                opacity: 0.7,
              },
            }}
          >
            {isSubmitting ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  justifyContent: "center",
                }}
              >
                <CircularProgress size="20px" sx={{ color: "#fff" }} />
                Processing...
              </Box>
            ) : (
              "Continue Book"
            )}
          </Button>
        </Box>
      </Box>

      <AuthRequiredDialog
        open={authDialogOpen}
        onClose={() => setAuthDialogOpen(false)}
        action="book a room"
      />
    </Box>
  );
}

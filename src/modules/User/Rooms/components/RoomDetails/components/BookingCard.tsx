import { Box, Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import type { BookingCardProps } from "../Types/types";
import { useMemo } from "react";

export default function BookingCard({
  price,
  discount,
  startDate,
  endDate,
}: BookingCardProps) {
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

  const formatedStartDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short'
  }).format(new Date(startDate)) 

  const formatedEndDate = new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short'
  }).format(new Date(endDate))
  
const formattedPrice = new Intl.NumberFormat("en-US").format(price);
const formattedDiscountedPrice = new Intl.NumberFormat("en-US").format(discountedPrice);

  return (
    <>
      <Box
        sx={{
          p: 6,
          border: "1px solid #E5E5E5",
          borderRadius: "15px",
          width: "500px",
        }}
      >
        <Box sx={{ mb: 5 }}>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "20px",
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
              gap: 1,
              fontSize: "36px",
              fontWeight: 300,
            }}
          >
            {discount > 0 && (
              <Box
                component="span"
                sx={{
                  color: "#B0B0B0",
                  textDecoration: "line-through",
                  fontSize: "20px",
                }}
              >
                ${formattedPrice}
              </Box>
            )}

            <Box
              component="span"
              sx={{
                color: "#1ABC9C",
                fontSize: "36px",
                fontWeight: 600,
              }}
            >
              ${formattedDiscountedPrice}
            </Box>

            <Box component="span" sx={{ color: "#B0B0B0", fontSize: "36px" }}>
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

          <Typography
            sx={{
              position: "relative",
              border: "1px solid transparent",
              borderRadius: "4px",
              textAlign: "center",
              bgcolor: "#F5F6F8",
              py: 1,
            }}
          >
            <CalendarMonthIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#3252DF",
              }}
            />
            {formatedStartDate} - {formatedEndDate}
          </Typography>

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
              variant="contained"
              sx={{
                bgcolor: "#3252DF",
                px: 5,
                fontSize: "18px",
                textTransform: "none",
              }}
            >
              Continue Book
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

import { Box, Typography, Button, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import type { ReviewFormData } from "../Types/types";
import { RoomsAPI } from "../../../../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface ReviewsProps {
  roomId?: string;
}

export default function Reviews({ roomId }: ReviewsProps) {
  const { register, handleSubmit, control } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 2,
      review: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {

    if (!roomId) return;
    try {
      const response = await RoomsAPI.createReview({
        ...data,
        roomId: roomId!,
      });
      toast.success(response.data.message);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }
  };
 
  return (
    <>
      <Box sx={{mr: {md: 4}}}>
        <Typography
          sx={{
            color: "#152C5B",
            fontWeight: 500,
            fontSize: "18px",
          }}
        >
          Rate
        </Typography>

        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Rating
              sx={{ my: 1 }}
              value={field.value}
              onChange={(_, newValue) => field.onChange(newValue)}
            />
          )}
        />

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography
            sx={{
              color: "#152C5B",
              fontWeight: 500,
              fontSize: "18px",
              mb: 1,
            }}
          >
            Message
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Write your review..."
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#3252DF",
                },
                "&:hover fieldset": {
                  borderColor: "#3252DF",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3252DF",
                  borderWidth: "2px",
                },
              },
            }}
            {...register("review")}
          />
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                bgcolor: "#3252DF",
                px: 6,
                fontSize: "18px",
                textTransform: "none",
              }}
            >
              Rate
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

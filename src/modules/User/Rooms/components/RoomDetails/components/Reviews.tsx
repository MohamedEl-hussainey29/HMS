import { Box, Typography, Button, TextField, CircularProgress } from "@mui/material";
import Rating from "@mui/material/Rating";
import { useForm, Controller } from "react-hook-form";
import type { ReviewFormData } from "../Types/types";
import { RoomsAPI } from "../../../../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useState } from "react";

interface ReviewsProps {
  roomId?: string;
}

export default function Reviews({ roomId }: ReviewsProps) {
  const [submitLoading , setSubmitLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } ,control, reset } = useForm<ReviewFormData>({
    defaultValues: {
      rating: 2,
      review: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    setSubmitLoading(true)
    if (!roomId) return;
    try {
      const response = await RoomsAPI.createReview({
        ...data,
        roomId: roomId!,
      });
      toast.success(response.data.message);
      reset({
      rating: 2,
      review: "",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message);
      }
    }finally{
      setSubmitLoading(false)
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
            error={!!errors?.review}
            helperText={errors?.review?.message}
            {...register("review" , {required: "Please , Fill this Field!"})}
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
              {submitLoading? <CircularProgress size="30px" aria-label="Loading…" sx={{color: "#FFF"}} />: "Rate"}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

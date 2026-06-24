/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { AuthAPI } from "../../../api";

export interface ForgetPasswordFormData {
  email: string;
}

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {register,handleSubmit,formState: { errors }} = useForm<ForgetPasswordFormData>();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.ForgetPassword(data);
      toast.success(response?.data?.message);
      navigate("/auth/reset-pass");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 2,
        }}
      >
        Forgot password
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#555",
          mb: 1,
        }}
      >
        If you already have an account register
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 5,
        }}
      >
        You can{" "}
        <Link
          to="/auth/login"
          style={{
            color: "#ff4d4f",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Login here !
        </Link>
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: "#1f3c88",
            fontWeight: 500,
          }}
        >
          Email
        </Typography>

        <TextField
          fullWidth
          placeholder="Please type here ..."
          size="small"
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          sx={{
            marginTop: '4px',
            backgroundColor: "#F5F6F8",
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
            mt: 3,
            py: 1.5,
            textTransform: "none",
            borderRadius: 2,
            backgroundColor: "#365CF5",
            boxShadow: "0 8px 20px rgba(54,92,245,0.25)",
          }}
        >
          {isLoading ? (
            <CircularProgress size={22} color="inherit" />
          ) : (
            "Send mail"
          )}
        </Button>
      </Box>
    </Box>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {Box,Button,CircularProgress,IconButton,InputAdornment,TextField,Typography,} from "@mui/material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthAPI } from "../../../api";

export interface ResetPasswordFormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword , setShowPassword] = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const password = watch("password");

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.ResetPassword(data);
      toast.success(response?.data?.message);
      navigate("/auth/login");
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
        Reset Password
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#555",
          mb: 1,
        }}
      >
        Enter the OTP sent to your email and create a new password.
      </Typography>

      <Typography
        variant="body2"
        sx={{
          mb: 2,
        }}
      >
        Back to{" "}
        <Link
          to="/auth/login"
          style={{
            color: "#ff4d4f",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Login
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
            mb: 2,
            backgroundColor: "#F5F6F8",
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: "#1f3c88",
            fontWeight: 500,
          }}
        >
          OTP
        </Typography>

        <TextField
          fullWidth
          placeholder="Enter OTP"
          size="small"
          error={!!errors.seed}
          helperText={errors.seed?.message}
          {...register("seed", {
            required: "OTP is required",
          })}
          sx={{
            mb: 2,
            backgroundColor: "#F5F6F8",
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: "#1f3c88",
            fontWeight: 500,
          }}
        >
          Password
        </Typography>

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Enter new password"
          size="small"
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          sx={{
            mb: 2,
            backgroundColor: "#F5F6F8",
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: "#1f3c88",
            fontWeight: 500,
          }}
        >
          Confirm Password
        </Typography>

        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          size="small"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          sx={{
            mb: 2,
            backgroundColor: "#F5F6F8",
            borderRadius: "5px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={isLoading}
          sx={{
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
            "Reset Password"
          )}
        </Button>
      </Box>
    </Box>
  );
}


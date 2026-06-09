import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from "@mui/material/CircularProgress"; // إضافة مؤشر تحميل صغير

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthAPI } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface changePasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل لحماية الزر

  const { register, handleSubmit, watch, formState: { errors } } = useForm<changePasswordFormValues>({
    mode: "onChange"
  });

  const newPasswordValue = watch("newPassword");
  const navigate = useNavigate();

  const onSubmit = async (data: changePasswordFormValues) => {
    setIsLoading(true);
    try {
      const response = await AuthAPI.changePassword(data);
      console.log(response);

      toast.success("Password changed successfully! Please login again.");

      localStorage.removeItem("token");
      navigate("/auth/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Invalid old password");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const textFieldStyles = {
    marginTop: '4px',
    backgroundColor: "#F5F6F8",
    borderRadius: "5px",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  };

  return (
    <Box>
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight="bold">Change Password</Typography>
        <Typography sx={{ color: '#6F7E8C' }}>
          Update your account password in just a few clicks.
        </Typography>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", mt: 3 }}
      >
        <Stack spacing={3}>

          {/* Old Password */}
          <Box>
            <label htmlFor="oldPassword" style={{ color: '#152C5B', fontWeight: 500 }}>
              Old Password
            </label>
            <TextField
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              placeholder="Please Type here..."
              fullWidth
              disabled={isLoading}
              sx={textFieldStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowOldPassword(!showOldPassword)}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showOldPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors?.oldPassword}
              helperText={errors?.oldPassword?.message}
              {...register("oldPassword", { required: "Old Password is required!" })}
            />
          </Box>

          {/* New Password */}
          <Box>
            <label htmlFor="newPassword" style={{ color: '#152C5B', fontWeight: 500 }}>
              New Password
            </label>
            <TextField
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              placeholder="Please Type here..."
              fullWidth
              disabled={isLoading}
              sx={textFieldStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors?.newPassword}
              helperText={errors?.newPassword?.message}
              {...register("newPassword", { required: "New Password is required!" })}
            />
          </Box>

          {/* Confirm New Password */}
          <Box>
            <label htmlFor="confirmPassword" style={{ color: '#152C5B', fontWeight: 500 }}>
              Confirm New Password
            </label>
            <TextField
              id="confirmPassword"
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Please Type here..."
              fullWidth
              disabled={isLoading}
              sx={textFieldStyles}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                        edge="end"
                        disabled={isLoading}
                      >
                        {showConfirmNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirming your new password is required!",
                validate: (value) => value === newPasswordValue || "Passwords do not match!"
              })}
            />
          </Box>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          disabled={isLoading} // تعطيل الزر أثناء إرسال الطلب للسيرفر
          sx={{
            width: '100%',
            bgcolor: '#3252DF',
            p: 1.8,
            mt: 5,
            textTransform: 'none',
            fontSize: '16px'
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
}
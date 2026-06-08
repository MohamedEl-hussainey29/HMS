import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { AuthAPI } from "../../../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

export interface registerFormValues {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  role: "user";
  profileImage: FileList;
}

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<registerFormValues>({
    mode: "onSubmit",
  });

  const password = watch("password");

  const appendDataToFormData = (data: registerFormValues) => {
    const formData = new FormData();

    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("role", "user");

    if (data.profileImage && data.profileImage.length > 0) {
      formData.append("profileImage", data.profileImage[0]);
    }
    return formData;
  };

  const imagePreview = profileImage? URL.createObjectURL(profileImage) : "";
  
  const onSubmit = async (data: registerFormValues) => {
    const formData = appendDataToFormData(data);

    try {
      const response = await AuthAPI.Register(formData);
      toast.success(response.data.message);
      navigate("/auth/login");
      console.log(response);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <>
      <Box sx={{ position: "relative" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            marginBottom: "20px",
          }}
          component={"h3"}
        >
          Sign up
        </Typography>

        <Typography
          sx={{ fontSize: "16px", marginBottom: "20px" }}
          component={"p"}
        >
          If you already have an account register <br />
          You can{" "}
          <Link
            href="/auth/login"
            underline="hover"
            sx={{ color: "#EB5148", fontWeight: "bold" }}
          >
            {" "}
            Login here !{" "}
          </Link>
        </Typography>

        {/* form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputLabel
            htmlFor="profileImage"
            sx={{
              position: "absolute",
              top: "50px",
              right: "10px",
              cursor: "pointer",
            }}
          >
            <IconButton
              component={"span"}
              sx={{
                position: "absolute",
                zIndex: 1,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <CameraAltIcon />
            </IconButton>
            <Avatar alt="" src={imagePreview} sx={{ width: 80, height: 80 }} />
            <Box
              component={"div"}
              sx={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,.2)",
                borderRadius: "50%",
              }}
            ></Box>
          </InputLabel>
          <TextField
            type="file"
            slotProps={{
              htmlInput: {
                accept: "image/*",
              },
            }}
            size={"small"}
            fullWidth
            id="profileImage"
            sx={{ display: "none" }}
            error={!!errors?.profileImage}
            helperText={errors?.profileImage?.message}
            {...register("profileImage", {
              required: "Profile image is required",
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setProfileImage(file);
                  
                }
              },
            })}
          />

          <InputLabel htmlFor="userName" className="form-label">
            User Name
          </InputLabel>
          <TextField
            type="text"
            size={"small"}
            fullWidth
            id="userName"
            sx={{
              borderRadius: "4px",
              backgroundColor: "#F5F6F8",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            placeholder=" type here..."
            error={!!errors?.userName}
            helperText={errors?.userName?.message}
            {...register("userName", { required: "User name is required" })}
          />

          <Grid container spacing={2} sx={{ my: "15px" }}>
            <Grid size={{ md: 6 }}>
              <InputLabel htmlFor="phone" className="form-label">
                Phone Number
              </InputLabel>
              <TextField
                type="text"
                size={"small"}
                fullWidth
                id="phone"
                sx={{
                  borderRadius: "4px",
                  backgroundColor: "#F5F6F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                placeholder=" type here..."
                error={!!errors?.phoneNumber}
                helperText={errors?.phoneNumber?.message}
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <InputLabel htmlFor="country" className="form-label">
                Country
              </InputLabel>
              <TextField
                type="text"
                size={"small"}
                fullWidth
                id="country"
                sx={{
                  borderRadius: "4px",
                  backgroundColor: "#F5F6F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                placeholder=" type here..."
                error={!!errors?.country}
                helperText={errors?.country?.message}
                {...register("country", { required: "Country is required" })}
              />
            </Grid>
          </Grid>

          <InputLabel htmlFor="email" className="form-label">
            Email Address
          </InputLabel>
          <TextField
            type="email"
            size={"small"}
            fullWidth
            id="email"
            sx={{
              backgroundColor: "#F5F6F8",
              borderRadius: "4px",
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
            placeholder=" type here..."
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register("email", { required: "Email is required" })}
          />

          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                right: "10px",
                top: "75%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              {showPassword ? (
                <Box
                  component={"span"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <VisibilityOffIcon />
                </Box>
              ) : (
                <Box
                  component={"span"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {" "}
                  <VisibilityIcon />{" "}
                </Box>
              )}
            </IconButton>
            <InputLabel
              htmlFor="password"
              className="form-label"
              sx={{ mt: "15px" }}
            >
              Password
            </InputLabel>
            <TextField
              type={showPassword ? "text" : "password"}
              size={"small"}
              fullWidth
              id="password"
              sx={{
                backgroundColor: "#F5F6F8",
                borderRadius: "4px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              placeholder=" type here..."
              error={!!errors?.password}
              helperText={errors?.password?.message}
              {...register("password", { required: "Password is required" })}
            />
          </Box>

          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                right: "10px",
                top: "75%",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            >
              {showConfirmPassword ? (
                <Box
                  component={"span"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <VisibilityOffIcon />
                </Box>
              ) : (
                <Box
                  component={"span"}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {" "}
                  <VisibilityIcon />{" "}
                </Box>
              )}
            </IconButton>
            <InputLabel
              htmlFor="confirmPassword"
              className="form-label"
              sx={{ mt: "15px" }}
            >
              Confirm Password
            </InputLabel>
            <TextField
              type={showConfirmPassword ? "text" : "password"}
              size={"small"}
              fullWidth
              id="confirmPassword"
              sx={{
                borderRadius: "4px",
                backgroundColor: "#F5F6F8",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              placeholder=" type here..."
              error={!!errors?.confirmPassword}
              helperText={errors?.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "passwords do not match",
              })}
            />
          </Box>

          <Button
            type="submit"
            sx={{
              my: 3,
              backgroundColor: "#3252DF",
              "&:hover": { backgroundColor: "#405dde" },
              color: "white",
            }}
            fullWidth
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </>
  );
}

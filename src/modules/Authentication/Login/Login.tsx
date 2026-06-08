import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { AuthAPI } from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";

export interface LoginFormValues {
  email: string;
  password: string;
}
export default function Login() {
  const [showPassword , setShowPassword] = useState(false);
  const [isLoading , setIsLoading] = useState(false);

  const {register,handleSubmit,formState: { errors }} = useForm<LoginFormValues>();

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within AuthProvider");
  }
  const { saveUserData } = authContext;

  const onSubmit = async(data : LoginFormValues)=>{
    setIsLoading(true)
    try {
      const response = await AuthAPI.Login(data);
      const responseToken = response?.data?.data?.token;
      const token = responseToken.split(" ")[1];
      
      const decoded = jwtDecode<{ role: string }>(token);
      localStorage.setItem("token", token);
      saveUserData();
      toast.success(response?.data?.message);
      if(decoded?.role === "admin"){
        navigate("/dashboard");
      }else{
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box>
        <Stack spacing={3}>
          <Typography variant="h4">Sign in</Typography>
          <Box>
            <Typography>If you don’t have an account register</Typography>
            <Typography>You can  <Link to="/auth/register" style={{textDecoration:'none', color:'#152C5B' , fontWeight:600}}> Register here!</Link></Typography>
          </Box>
        </Stack>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{width:"100%" , mt:3}}
        >
          <Stack spacing={3}>
            <Box>
              <label htmlFor="email" style={{color:'#152C5B'}}>Email Address</label>
              <TextField
                id="email"
                type="email"
                placeholder="Please Type here..."
                fullWidth
                sx={{
                  marginTop: '4px',
                  backgroundColor: "#F5F6F8",
                  borderRadius: "5px",
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                }}
                error={!!errors?.email}
                helperText={errors?.email?.message}
                {...register("email", {
                  required: "Email is required!",
                  pattern:{
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message:'Email is not valid!'
                }})}
              />
            </Box>
            <Box>
              <label htmlFor="password" style={{color:'#152C5B'}}>Password</label>
              <TextField
                id="password"
                type= {showPassword? "text": "password"}
                placeholder="Please Type here..."
                fullWidth
                sx={{
                  marginTop: '4px',
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
                error={!!errors?.password}
                helperText={errors?.password?.message}
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                  value: 8,
                  message: "Password should be at least 8 characters!",
                }
                })}
              />
            </Box>
          </Stack>
          <Box sx={{display:'flex', justifyContent:'end', mt:1}}>
            <Link to="/auth/forget-pass" style={{textDecoration:'none' , color:'#4D4D4D' , fontSize:'12px'}}>Forgot Password?</Link>
          </Box>
           <Button type="submit" variant="contained" sx={{width:'100%',bgcolor:'#3252DF',p:2,mt:5}} disabled={isLoading}>
            {isLoading? <CircularProgress size="30px" aria-label="Loading…" /> : "Login"}
          </Button>
        </Box>
      </Box>
    </>
  )
}

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

interface LoginFormValues {
  email: string;
  password: string;
}
export default function Login() {
  const [showPassword , setShowPassword] = useState(false);

  const {register,handleSubmit,formState: { errors }} = useForm<LoginFormValues>();

  const onSubmit = (data : LoginFormValues)=>{
    try {
      console.log(data)
    } catch (error) {
      console.log(error)
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
                error={!!errors?.email}
                helperText={errors?.email?.message}
                {...register("password", {required: "Password is required!" })}
              />
            </Box>
          </Stack>
          <Box sx={{display:'flex', justifyContent:'end', mt:1}}>
            <Link to="/auth/forget-pass" style={{textDecoration:'none' , color:'#4D4D4D' , fontSize:'12px'}}>Forgot Password?</Link>
          </Box>
           <Button type="submit" variant="contained" sx={{width:'100%',bgcolor:'#3252DF',p:2,mt:5}}>Login</Button>
        </Box>
      </Box>
    </>
  )
}

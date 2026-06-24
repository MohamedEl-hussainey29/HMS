import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function VerifyAccount() {
  return (
    <>
      <Box sx={{ width: "100%", mt: 5 }}>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "30px",
            mb: "20px",
          }}
          component={"h3"}
        >
          Verify Account
        </Typography>
        <Typography
          sx={{ fontSize: "16px", mb: "20px" }}
          component={"p"}
        >
          We've sent a verification code to your email address, Please enter the
          code below to verify your account.
        </Typography>

         <Box component='form' >
       
        <InputLabel htmlFor="email" className="form-label">
          Email
        </InputLabel>
        <TextField
        size = {"small"}
          fullWidth
          id="email"
          sx={{
            backgroundColor: "#F5F6F8",
            borderRadius: "4px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          placeholder="Please type here..."
        />

        <InputLabel htmlFor="password" className="form-label" sx={{mt : '15px'}}>
           OTP
        </InputLabel>
        <TextField
        size = {"small"}
          fullWidth
          id="password"
          sx={{
            backgroundColor: "#F5F6F8",
            borderRadius: "4px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          placeholder="Please type here..."
        />


        <Button  sx={{ my: 3, backgroundColor: "#3252DF", "&:hover": { backgroundColor: "#405dde" }, color: 'white' }} 
        fullWidth>
          Verify Account
        </Button>
        </Box>
      </Box>
    </>
  );
}

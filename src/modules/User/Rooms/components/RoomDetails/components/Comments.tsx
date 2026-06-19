import { Box, Typography, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import type { CommentsFormData } from "../Types/types";
import { RoomsAPI } from "../../../../../../api";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface commentsProps {
   roomId?: string
}

export default function Comments({roomId}: commentsProps) {

  const {register, handleSubmit, reset} = useForm<CommentsFormData>();

  const onSubmit = async (data: CommentsFormData) => {
    
     try {
      const response = await RoomsAPI.createComment({...data, roomId: roomId!});
      toast.success(response.data.message)
      reset();

     } catch (error) {
      if(error instanceof AxiosError){
        toast.error(error.response?.data.message);
      }
      
     }   
  }
  
  return<>
   <Box sx={{ml: {md: 4}}}>
        <Typography sx={{
              color: "#152C5B",
              fontWeight: 500,
              fontSize: '18px',
              mb: 5
            }}>Add your comment</Typography>

        <Box component= 'form' onSubmit={handleSubmit(onSubmit)}>
          
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
            {...register('comment')}
          />

          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ bgcolor: "#3252DF", px: 6, fontSize: "18px", textTransform: "none" }}
          >
            Send
          </Button>
        </Box>
        </Box>

        
      </Box>
  </>
}

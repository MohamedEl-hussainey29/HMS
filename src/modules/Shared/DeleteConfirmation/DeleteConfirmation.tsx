import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Typography } from '@mui/material';
import deleteImg from "../../../assets/images/delete.png"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DeleteConfirmationProps {
  isLoading: boolean;
  open: boolean;
  handleClose: () => void;
  onDelete: (_id: string) => void;
  item: string;
  itemData: {
    _id: string;
    name?: string;
    roomNumber?: string;
  } | null;
}


export default function DeleteConfirmation({isLoading,open,handleClose,onDelete,item,itemData}: DeleteConfirmationProps) {
  
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {borderRadius: "16px"}}
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size='small'
          sx={{
            position: 'absolute',
            right: 20,
            top: 15,
            color: "red",
            border: "2px solid red",
            borderRadius: "50%"
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent >
          <Box sx={{textAlign:'center' , px: 4}}>
            <Box component="img" src={deleteImg} alt="deleteImg" sx={{width:"100px" ,  height:"100px", objectFit:"contain" , my: 5}} />
            <Typography variant='h5' sx={{mb:0 , color: '#494949', fontWeight:700}}>Delete This {item}?</Typography>
            <Typography variant='subtitle1' sx={{color:'rgba(73, 73, 73, 0.6)'}}>
              are you sure you want to delete <Box component="span" sx={{color:'#203FC7'}} >{itemData?.name || itemData?.roomNumber}</Box> ? if you are sure just click on delete it
            </Typography>
          </Box>
          <DialogActions sx={{justifyContent:{xs: "space-evenly" , md:"end"}}}>
              <Button
                variant='contained'
                size='large'
                sx={{my: 3, bgcolor:"#b4b4b4" , textTransform:'capitalize'}}
                onClick={handleClose}
              >
                cancel
              </Button>
              <Button 
                type='submit'
                disabled={isLoading}
                variant='contained' 
                size='large' 
                autoFocus 
                sx={{my: 3, bgcolor:"#203FC7" , textTransform:'capitalize'}}
                onClick={()=>{
                  if(!itemData) return;
                  onDelete(itemData?._id)}
                }
              >
                {isLoading? <CircularProgress size="30px" aria-label="deleting" /> : "delete"}
              </Button>
            </DialogActions>
        </DialogContent>
      </BootstrapDialog>
    </>
  )
}

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Divider, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { FacilitiesAPI } from '../../../../api';
import { toast } from 'react-toastify';
import axios from 'axios';
import type { Facility } from './FacilitiesList';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface FacilityDataProps {
  open: boolean;
  handleClose: () => void;
  refetchData: () => void;
  facility: Facility | null;
}

export interface FacilityFormValues{
  name: string;
}

export default function FacilityData({open , handleClose , refetchData ,facility}: FacilityDataProps) {
  const [submitLoading , setSubmitLoading] = useState(false)
  const {register,handleSubmit,formState: { errors } , reset} = useForm<FacilityFormValues>();

  useEffect(() => {
    if (facility) {
      reset({name: facility.name});
    } else {
      reset({name: ""});
    }
  }, [facility, reset]);

  const submitFacility = async(data: FacilityFormValues)=> {
    setSubmitLoading(true);
    try {
      let response;
      if(facility){
        response = await FacilitiesAPI.UpdateFacility(facility._id , data);
      }else{
        response = await FacilitiesAPI.CreateFacility(data);
      }
      toast.success(response?.data?.message);
      refetchData();
      reset();
      handleClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
    }finally{
      setSubmitLoading(false)
    }
  }
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {sx: {borderRadius: "16px"}}
        }}
      >
        <DialogTitle sx={{p: 2 , ml:3 , fontWeight:700, color:"#494949" }} id="customized-dialog-title">
          {facility ? "Edit Facility" : "Add Facility"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          size='small'
          sx={{
            mr: 3,
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
        <DialogContent>
          <Box component="form" id="facility-form" onSubmit={handleSubmit(submitFacility)} sx={{mx: 3}}>
            <TextField
              type="text"
              placeholder="Name"
              fullWidth
              sx={{
                my: 5,
                backgroundColor: "#eaeaea",
                borderRadius: "5px",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
              }}
              error={!!errors?.name}
              helperText={errors?.name?.message}
              {...register("name", {
                required: "Facility Name is required!",
              })}
            />
            
          </Box>
        </DialogContent>
        <Divider sx={{borderBottomWidth: 2}}/>
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
                form= "facility-form"
                disabled={submitLoading}
                variant='contained' 
                size='large' 
                autoFocus 
                sx={{my: 3 , mr: 1, bgcolor:"#203FC7" , textTransform:'capitalize'}}
              >
              {submitLoading? <CircularProgress size="30px" aria-label="saving" /> : "save"}
              </Button>
            </DialogActions>
      </BootstrapDialog>
    </>
  )
}

import { Stepper, Step, StepLabel, Box } from "@mui/material";

interface PaymentStepperProps {
  completed: boolean;
}

const steps = ["Booking", "Payment", "Completed"];

export default function PaymentStepper({completed}: PaymentStepperProps) {
   
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>

        <Stepper activeStep={completed ? 2 : 1} alternativeLabel sx={{ width: 400 }}>

          {steps.map((label, index) => (
            <Step key={label} completed={completed? true : index < 1}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
}

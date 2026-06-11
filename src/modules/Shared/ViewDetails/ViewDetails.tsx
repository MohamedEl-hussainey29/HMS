import {Dialog,DialogTitle,DialogContent,IconButton,Typography,Box,Divider} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Field {
  label: string;
  value: string | number | boolean | null | undefined;
}

interface ViewDetailsProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  fields: Field[];
}

export default function ViewDetails({open,handleClose,title,fields}: ViewDetailsProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {borderRadius: 4, mx: 2}}
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "#203FC7",
          color: "#fff",
          fontWeight: 700,
          position: "relative",
          fontSize: {xs: "1rem",sm: "1.25rem"},
          pr: 6
        }}
      >
        {title}
        <IconButton
          onClick={handleClose}
          sx={{position: "absolute",right: 12,top: 12,color: "#fff"}}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        {fields.map((field, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "flex",
                flexDirection: {xs: "column",sm: "row"},
                justifyContent: "space-between",
                alignItems: {xs: "flex-start",sm: "center"},
                gap: 1,
                py: 2,
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  minWidth: {xs: "auto", sm: 120},
                  color: "#203FC7",
                }}
              >
                {field.label}
              </Typography>

              <Box
                sx={{
                  textAlign: {xs: "left",sm: "right"},
                  width: {xs: "100%", sm: "auto"},
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                <Typography>
                  {field.value?.toString() || "N/A"}
                </Typography>
              </Box>
            </Box>

            {index !== fields.length - 1 && (
              <Divider />
            )}
          </Box>
        ))}
      </DialogContent>
    </Dialog>
  );
}
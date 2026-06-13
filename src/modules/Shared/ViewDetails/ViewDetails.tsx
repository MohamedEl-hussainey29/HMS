import {Dialog,DialogTitle,DialogContent,IconButton,Typography,Box,Divider, Button, Chip} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useState } from "react";

interface Field {
  label: string;
  value?: string | number | boolean | null | undefined;
  images?: string[];
  list?: string[];
  profileImage?: string;
}

interface ViewDetailsProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  fields: Field[];
}

export default function ViewDetails({open,handleClose,title,fields}: ViewDetailsProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      (prev - 1 + viewerImages.length) % viewerImages.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      (prev + 1) % viewerImages.length
    );
  };

  return (
    <>
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
                  alignItems: {xs: "flex-start",sm: field.images ? "flex-start" : "center"},
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

                {field.images ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: {xs: "flex-start", sm: "flex-end"},
                      width: {xs: "100%", sm: "auto"},
                    }}
                  >
                    {field.images.length > 0 ? (
                      field.images.map((src, i) => (
                        <Box
                          key={i}
                          component="img"
                          src={src}
                          alt={`${field.label}-${i}`}
                          onClick={() => {
                            setViewerImages(field.images ?? []);
                            setCurrentIndex(i);
                            setViewerOpen(true);
                          }}
                          sx={{
                            width: 70,
                            height: 70,
                            objectFit: "cover",
                            borderRadius: "8px",
                            border: "1px solid #E2E5EB",
                            cursor: "pointer",
                          }}
                        />
                      ))
                    ) : (
                      <Typography>N/A</Typography>
                    )}
                  </Box>
                ) : field.list ? (
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 1,
                      justifyContent: {xs: "flex-start", sm: "flex-end"},
                      width: {xs: "100%", sm: "auto"},
                    }}
                  >
                    {field.list.length > 0 ? (
                      field.list.map((item, i) => (
                        <Box
                          key={i}
                          sx={{
                            bgcolor: "#E2E5EB",
                            color: "#203FC7",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: "8px",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          }}
                        >
                          {item}
                        </Box>
                      ))
                    ) : (
                      <Typography>N/A</Typography>
                    )}
                  </Box>
                ) :field.label === "Status" ? (
                  <Chip
                    label= {field.value}
                    sx={{
                      px: 2,
                      py: 0.5,
                      borderRadius: "20px",
                      bgcolor:
                        field.value === "completed" ? "#E8F5E9" : "#FFF3E0",
                      color: field.value === "completed" ? "#2E7D32" : "#ED6C02",
                      fontWeight: 600,
                    }}
                  />
                ) : (
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
                )}
              </Box>
              {index !== fields.length - 1 && <Divider />}
            </Box>
          ))}
        </DialogContent>
      </Dialog>
      {/* images */}
      <Dialog
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              overflow: "hidden",
            },
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            p: 2,
          }}
        >
          <Box
            component="img"
            src={viewerImages[currentIndex]}
            alt="Preview"
            sx={{
              maxWidth: "100%",
              maxHeight: "70vh",
              objectFit: "contain",
            }}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="outlined"
              onClick={handlePrev}
              disabled={viewerImages.length <= 1}
              startIcon={<NavigateBeforeIcon/>}
              sx={{bgcolor:'#FFF'}}
            >
              Previous
            </Button>

            <Typography sx={{color:'#FFF'}}>
              {currentIndex + 1} / {viewerImages.length}
            </Typography>
            
            <Button
              variant="outlined"
              onClick={handleNext}
              disabled={viewerImages.length <= 1}
              endIcon={<NavigateNextIcon/>}
              sx={{bgcolor:'#FFF'}}
            >
              Next
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
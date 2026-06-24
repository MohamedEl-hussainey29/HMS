import { Box, Typography } from "@mui/material";
import noDataImg from "../../../assets/images/noData.avif";
 interface NoDataProps{
  item : string;
 }
export default function NoData({item = "Data"}:NoDataProps) {
  return (
    <Box
      sx={{
        display:'flex',
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center',
        textAlign:'center',
        px: 3,
        py: 4,
        minHeight: "250px"
      }}
    >
      <Box 
        component="img" 
        src={noDataImg} 
        alt="noData"
        sx={{width:'140px' , maxWidth: "60%" , objectFit: "contain"}}
      />
      <Typography 
        sx={{mt: 3 , fontWeight: "bold" , color: "rgba(73, 73, 73, 1)", fontSize: "clamp(20px, 4vw, 28px)"}}
        >
        No {item}!
      </Typography>
      <Typography 
        sx={{mb: 0 , color: "rgba(73, 73, 73, 0.6)", fontSize: "clamp(14px, 2vw, 16px)", maxWidth: "320px"}}
      >
        There are no {item} to show here!
      </Typography>
    </Box>
  );
}

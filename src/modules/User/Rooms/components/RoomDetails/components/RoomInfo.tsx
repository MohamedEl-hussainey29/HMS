import { Box, Typography, Stack } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import KitchenOutlinedIcon from "@mui/icons-material/KitchenOutlined";
import LocalBarOutlinedIcon from "@mui/icons-material/LocalBarOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import FitnessCenterOutlinedIcon from "@mui/icons-material/FitnessCenterOutlined";
import LocalParkingOutlinedIcon from "@mui/icons-material/LocalParkingOutlined";
import AcUnitOutlinedIcon from "@mui/icons-material/AcUnitOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ReactNode } from "react";
import type { RoomInfoProps } from "../Types/types";

export default function RoomInfo({ facilities }: RoomInfoProps) {
  const facilityIcons: Record<string, ReactNode> = {
    wifi: <WifiIcon />,
    tv: <TvIcon />,
    fridge: <KitchenOutlinedIcon />,
    drinks: <LocalBarOutlinedIcon />,
    pool: <PoolOutlinedIcon />,
    gym: <FitnessCenterOutlinedIcon />,
    parking: <LocalParkingOutlinedIcon />,
    "air conditioning": <AcUnitOutlinedIcon />,
    bathroom: <BathtubOutlinedIcon/>,
    cleaning: <CleaningServicesIcon/>
  };

  const defaultFacilityIcon = <HelpOutlineOutlinedIcon />;

  return (
    <>
      <Box sx={{color: "#B0B0B0" }}>
        <Stack spacing={1}>
          <Typography sx={{ fontWeight: 300, fontSize: "16px" }}>
            Minimal techno is a minimalist subgenre of techno music. It is{" "}
            <br />
            characterized by a stripped-down aesthetic that exploits the use of{" "}
            <br />
            repetition and understated development. Minimal techno is thought to{" "}
            <br />
            have been originally developed in the early 1990s by Detroit-based{" "}
            <br />
            producers Robert Hood and Daniel Bell.
          </Typography>

          <Typography sx={{ fontWeight: 300, fontSize: "16px" }}>
            Such trends saw the demise of the soul-infused techno that typified
            the <br /> original Detroit sound. Robert Hood has noted that he and
            Daniel Bell both <br /> realized something was missing from techno
            in the post-rave era.
          </Typography>

          <Typography sx={{ fontWeight: 300, fontSize: "16px" }}>
            Design is a plan or specification for the construction of an object
            or system <br /> or for the implementation of an activity or
            process, or the result of that plan <br /> or specification in the
            form of a prototype, product or process. The national <br /> agency
            for design: enabling Singapore to use design for economic growth{" "}
            <br /> and to make lives better.
          </Typography>
        </Stack>

        {/* facilities */}
      
        <Box
          sx={{
            display: "flex",
            alignItems: 'center',
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          { facilities.length > 0 && <Typography
          sx={{
            mt: 5,
            fontSize: "22px",
            fontWeight: 600,
            color: "#152C5B",
          }}
        >
          Facilities :
        </Typography>}

          {facilities.map((facility) => (
            <Box
              key={facility._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                pt: 4
              }}
            >
              <Box
                sx={{
                  color: "#FF1612",
                  fontSize: 35,
                }}
              >
                {facilityIcons[facility.name.toLowerCase()] ??
                  defaultFacilityIcon}
              </Box>

              <Typography
                sx={{
                  
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {facility.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}

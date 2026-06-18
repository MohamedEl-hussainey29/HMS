import { Grid} from "@mui/material";
import Header from "./Header";
import PopularAds from "./PopularAds";
import StaticSection from "./StaticSection";
import AdsSlider from "./AdsSlider";
// import roomImage from "../../../../assets/images/old-money-style-bedroom@2x.jpg"

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: { _id: string; name: string }[];
  createdBy: { _id: string; userName: string };
  images: string[];
  createdAt: string;
  updatedAt: string;
}



export default function Home() {
  return (
    <>
      <Grid sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 }, overflow: "hidden" }}>
        <Header/>
        <PopularAds/>
        <StaticSection/>
        <AdsSlider/>
      </Grid>
    </>
  )
}

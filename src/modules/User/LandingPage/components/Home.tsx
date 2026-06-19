import { Grid} from "@mui/material";
import Header from "./Header";
import PopularAds from "./PopularAds";
import StaticSection from "./StaticSection";
import AdsSlider from "./AdsSlider";
import ReviewsSlider from "./ReviewsSlider";
import { useEffect } from "react";

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
  useEffect(() => {
    sessionStorage.removeItem("roomFilters");
  }, []);
  return (
    <>
      <Grid sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 }, overflow: "hidden" }}>
        <Header/>
        <PopularAds/>
        <StaticSection/>
        <AdsSlider/>
        <ReviewsSlider/>
      </Grid>
    </>
  )
}

import { Grid} from "@mui/material";
import Header from "./Header";
import PopularAds from "./PopularAds";
import StaticSection from "./StaticSection";
import AdsSlider from "./AdsSlider";
import ReviewsSlider from "./ReviewsSlider";
import { useCallback, useEffect } from "react";
import { AdsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import type { AdsResponse } from "../../../Admin/Ads/components/AdsList";

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

  const fetchAds = useCallback(() => {
      return AdsAPI.getAllAdsByUser({ page: 1, size: 10 });
  }, []);

  const { data: ads, isLoading } = useGetData<AdsResponse>(fetchAds, []);

  useEffect(() => {
    sessionStorage.removeItem("roomFilters");
  }, []);
  return (
    <>
      <Grid sx={{ px: { xs: 3, md: 8 }, py: { xs: 5, md: 8 }, overflow: "hidden" }}>
        <Header/>
        <PopularAds ads={ads} isLoading={isLoading}/>
        <StaticSection/>
        <AdsSlider ads={ads} isLoading={isLoading}/>
        <ReviewsSlider/>
      </Grid>
    </>
  )
}

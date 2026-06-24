import { Box, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from "swiper/modules";
import RoomCard from "../../../Shared/RoomCard/RoomCard";
import Spinner from "../../../Shared/Spinner/Spinner";
import type { AdsResponse } from "../../../Admin/Ads/components/AdsList";

interface AdsSliderProps{
    ads?: AdsResponse | null;
    isLoading: boolean;
}

export default function AdsSlider({ads , isLoading}:AdsSliderProps) {

        
    

    const slides = ads?.data?.ads ?? [];

  return (
    <>
        <Box sx={{ mt: 5 }}>
            <Typography sx={{fontWeight: 700,fontSize: "1.2rem",color: "#152C5B",mb: 2}}>
                Ads
            </Typography>
        </Box>

        {isLoading ? (<Spinner />) 
        : (
        <Box
            sx={{
            "& .swiper": { pb: 6 },
            "& .swiper-pagination": {bottom: "0px !important"}
            }}
        >
            <Swiper
                pagination={{dynamicBullets: true}}
                spaceBetween={24}
                loop={true}
                breakpoints={{
                    0: {slidesPerView: 1},
                    600: {slidesPerView: 2},
                    900: {slidesPerView: 4}
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <Grid container spacing={3} sx={{mt: 2}}>
                    {slides.map((ad,index) => (
                        <SwiperSlide>
                            <Grid key={index} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <RoomCard room={ad.room} showDiscount={true} />
                            </Grid>
                        </SwiperSlide>
                    ))}
                </Grid>
            </Swiper>
        </Box>
        )}
        
    </>
  )
}

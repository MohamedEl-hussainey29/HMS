import {Box,Grid,IconButton,Rating,Typography} from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import WestIcon from "@mui/icons-material/West";
import reviewImg from "../../../../assets/images/foto_keluarga.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef } from "react";
import { Autoplay } from "swiper/modules";

const reviews = [
    {
        title: "Happy Family",
        rating: 5,
        description: "What a great trip with my family and I should try again next time soon ...",
        user: "Angga, Product Designer"
    },
    {
        title: "Happy Friends",
        rating: 4,
        description: "What a great Week with my Friends and it won't be the last time ...",
        user: "Mike, Software Engineer"
    },
    {
        title: "Happy Couple",
        rating: 3,
        description: "What a Lovely Holiday and we will come again ",
        user: "Rachel, Graphic Designer"
    }
]


export default function ReviewsSlider() {
    const swiperRef = useRef<SwiperType | null>(null);
  return (
    <Box sx={{ py: 8 }}>
        <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => {
                swiperRef.current = swiper;
            }}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
        >
            {reviews.map((review , index) =>(
                <SwiperSlide key={index}>
                    <Grid container spacing={{ xs: 4, md: 6 }} sx={{alignItems: "center", justifyContent:"center"}}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <Box
                                component="img"
                                src={reviewImg}
                                alt="Happy Family"
                                sx={{
                                    width: "100%",
                                    maxWidth: 350,
                                    borderRadius: "12px 12px 100px 12px",
                                    display: "block",
                                }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Box sx={{mt: 3}}>
                                <Typography
                                    sx={{
                                    color: "#152C5B",
                                    fontWeight: 600,
                                    mb: 2,
                                    }}
                                >
                                    {review.title}
                                </Typography>

                                <Rating value={review.rating} readOnly sx={{ mb: 2 }} />

                                <Typography
                                    sx={{
                                    color: "#152C5B",
                                    fontSize: { xs: "1.5rem", md: "2rem" },
                                    lineHeight: 1.5,
                                    mb: 2,
                                    }}
                                >
                                    {review.description}
                                </Typography>

                                <Typography
                                    sx={{
                                    color: "#B0B0B0",
                                    mb: 4,
                                    }}
                                >
                                    {review.user}
                                </Typography>

                                <Box sx={{ display: "flex", gap: 2 }}>
                                    <IconButton
                                        onClick={() => swiperRef.current?.slidePrev()}
                                        sx={{
                                            border: "2px solid #3252DF",
                                            color: "#3252DF",
                                        }}
                                    >
                                        <WestIcon/>
                                    </IconButton>

                                    <IconButton
                                        onClick={() => swiperRef.current?.slideNext()}
                                        sx={{
                                            border: "2px solid #3252DF",
                                            color: "#3252DF",
                                        }}
                                    >
                                        <EastIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </SwiperSlide>
            ))}
            
      </Swiper>
    </Box>
  );
}
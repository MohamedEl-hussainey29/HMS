import houseImg1 from "../../../../assets/images/tabby-town.webp"
import houseImg2 from "../../../../assets/images/anggana.webp"
import houseImg3 from "../../../../assets/images/seattle-rain.webp"
import houseImg4 from "../../../../assets/images/wodden-pit.webp"
import hotelImg1 from "../../../../assets/images/green-park.webp"
import hotelImg2 from "../../../../assets/images/podo-wae.webp"
import hotelImg3 from "../../../../assets/images/silver-rain.webp"
import hotelImg4 from "../../../../assets/images/cashville.webp"

import { Box, Grid, Typography } from "@mui/material"
import StaticRoomCard from "./StaticRoomCard"

const houses = [
    {
        title: "Tabby Town",
        subTitle: "Gunung Batu, Indonesia",
        image: houseImg1
    },
    {
        title: "Anggana",
        subTitle: "Bogor, Indonesia",
        image: houseImg2
    },
    {
        title: "Seattle Rain",
        subTitle: "Jakarta, Indonesia",
        image: houseImg3
    },
    {
        title: "Wodden Pit",
        subTitle: "Wonosobo, Indonesia",
        image: houseImg4
    },
]
const hotels = [
    {
        title: "Green Park",
        subTitle: "Tangerang, Indonesia",
        image: hotelImg1
    },
    {
        title: "Podo Wae",
        subTitle: "Madiun, Indonesia",
        image: hotelImg2
    },
    {
        title: "Silver Rain",
        subTitle: "Bandung, Indonesia",
        image: hotelImg3
    },
    {
        title: "Cashville",
        subTitle: "Kemang, Indonesia",
        image: hotelImg4
    },
]

export default function StaticSection() {
  return (
    <>
        <Box sx={{mt: 12}}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#152C5B", mb: 2 }}>
                Houses with beauty backyard
            </Typography>
        </Box>
        <Box>
            <Grid container spacing={3} sx={{mt: 2}}>
              {houses.map((house,index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                  <StaticRoomCard house={house} />
                </Grid>
              ))}
            </Grid>
        </Box>
        <Box sx={{mt: 5}}>
            <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", color: "#152C5B", mb: 2 }}>
                Hotels with large living room
            </Typography>
        </Box>
        <Box>
            <Grid container spacing={3} sx={{mt: 2}}>
              {hotels.map((hotel,index) => (
                <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                  <StaticRoomCard house={hotel} />
                </Grid>
              ))}
            </Grid>
        </Box>
    </>
  )
}

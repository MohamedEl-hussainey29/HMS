import { Grid} from "@mui/material";
import Header from "./Header";
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
//   const rooms = [
//   {
//     _id: "6a27123b74cb50ccc74c65fd",
//     roomNumber: "701",
//     price: 2500,
//     capacity: 6,
//     discount: 19,
//     facilities: [],
//     createdBy: { _id: "69f50dd984cd475a059952d5", userName: "bassant" },
//     images: [roomImage],
//     createdAt: "2026-06-08T19:04:27.185Z",
//     updatedAt: "2026-06-14T15:50:33.371Z",
//   },
//   {
//     _id: "6a27123b74cb50ccc74c65fd",
//     roomNumber: "702",
//     price: 1500,
//     capacity: 4,
//     discount: 8,
//     facilities: [],
//     createdBy: { _id: "69f50dd984cd475a059952d5", userName: "bassant" },
//     images: [roomImage],
//     createdAt: "2026-06-08T19:04:27.185Z",
//     updatedAt: "2026-06-14T15:50:33.371Z",
//   },
//   {
//     _id: "6a27123b74cb50ccc74c65fd",
//     roomNumber: "703",
//     price: 2000,
//     capacity: 2,
//     discount: 15,
//     facilities: [],
//     createdBy: { _id: "69f50dd984cd475a059952d5", userName: "bassant" },
//     images: [roomImage],
//     createdAt: "2026-06-08T19:04:27.185Z",
//     updatedAt: "2026-06-14T15:50:33.371Z",
//   },
//   {
//     _id: "6a27123b74cb50ccc74c65fd",
//     roomNumber: "704",
//     price: 1850,
//     capacity: 3,
//     discount: 12,
//     facilities: [],
//     createdBy: { _id: "69f50dd984cd475a059952d5", userName: "bassant" },
//     images: [roomImage],
//     createdAt: "2026-06-08T19:04:27.185Z",
//     updatedAt: "2026-06-14T15:50:33.371Z",
//   },
// ];
  return (
    <>
      <Grid>
        <Header/>
      </Grid>
    </>
  )
}

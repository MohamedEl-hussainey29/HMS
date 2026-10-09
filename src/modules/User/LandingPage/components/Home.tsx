import { Box, Grid } from "@mui/material";
import Header from "./Header";
import PopularAds from "./PopularAds";
import StaticSection from "./StaticSection";
import { lazy, Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AdsAPI } from "../../../../api";
import useGetData from "../../../../hooks/useGetData";
import type { AdsResponse } from "../../../Admin/Ads/components/AdsList";

const AdsSlider = lazy(() => import("./AdsSlider"));
const ReviewsSlider = lazy(() => import("./ReviewsSlider"));

function DeferredSection({ children, minHeight }: { children: ReactNode; minHeight: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={sectionRef} sx={{ minHeight }}>
      {shouldRender && <Suspense fallback={<Box sx={{ minHeight }} />}>{children}</Suspense>}
    </Box>
  );
}

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
        <DeferredSection minHeight={300}>
          <AdsSlider ads={ads} isLoading={isLoading} />
        </DeferredSection>
        <DeferredSection minHeight={420}>
          <ReviewsSlider />
        </DeferredSection>
      </Grid>
    </>
  )
}

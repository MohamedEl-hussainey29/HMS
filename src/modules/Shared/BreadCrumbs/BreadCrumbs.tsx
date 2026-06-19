import { Box, Breadcrumbs, Link as MuiLink, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

const ROUTE_LABELS: Record<string, string> = {
  "explore-rooms": "Explore",
  "room-details": "Room Details",
  "favourites": "Favourites",
};

export default function BreadCrumbs() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const visibleSegments = pathSegments.filter((_, index) => {
    const prevSegment = pathSegments[index - 1];
    return prevSegment !== "room-details";
  });

  return (
    <Box sx={{ px: 3, py: 2 }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="/"
        sx={{ fontSize: "14px", color: "text.secondary" }}
      >
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          sx={{ color: "text.secondary", fontSize: "14px" }}
        >
          Home
        </MuiLink>

        {visibleSegments.map((segment, index) => {
          const isLast = index === visibleSegments.length - 1;
          const to = "/" + visibleSegments.slice(0, index + 1).join("/");
          const label = ROUTE_LABELS[segment] ?? segment;

          return isLast ? (
            <Typography
              key={to}
              sx={{ fontSize: "14px", color: "#152C5B" , fontWeight: 500 }}
            >
              {label}
            </Typography>
          ) : (
            <MuiLink
              key={to}
              component={RouterLink}
              to={to}
              underline="none"
              sx={{ color: "text.secondary", fontSize: "14px" }}
            >
              {label}
            </MuiLink>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
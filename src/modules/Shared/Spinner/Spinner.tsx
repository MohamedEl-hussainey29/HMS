import { Box, CircularProgress, circularProgressClasses } from "@mui/material";

export default function Spinner() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress
            variant="indeterminate"
            disableShrink
            enableTrackSlot
            sx={(theme) => ({
            color: "#1a90ff",
            animationDuration: "550ms",
            [`& .${circularProgressClasses.circle}`]: {
                strokeLinecap: "round",
            },
            [`& .${circularProgressClasses.track}`]: {
                opacity: 1,
                stroke: (theme.vars || theme).palette.grey[200],
                ...theme.applyStyles("dark", {
                stroke: (theme.vars || theme).palette.grey[800],
                }),
            },
            ...theme.applyStyles("dark", {
                color: "#308fe8",
            }),
            })}
            size={40}
            thickness={4}
            aria-label="Loading…"
        />
    </Box>
  )
}

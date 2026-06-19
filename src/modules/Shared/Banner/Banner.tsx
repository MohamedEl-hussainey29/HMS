import { Card, CardContent, Typography, Box } from "@mui/material";

import type { ReactNode } from "react";

interface dashboardBannerProps {
  value: number;
  title: string;
  icon: ReactNode
}

export default function Banner({value, title, icon} : dashboardBannerProps) {
  return <>
  <Card
      elevation={0}
      sx={{
        width: 250,
        bgcolor: "rgba(26, 27, 30, 1)",
        color: "#fff",
        borderRadius: 3
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          py: 5,
          px: 3,
          
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>

          <Typography sx={{mt: 0.5,color: "#C7C7C7",fontSize: 16}}
          >
            {title}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            bgcolor: "rgba(32, 63, 199, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}

        </Box>
      </CardContent>
    </Card>
  </>
}

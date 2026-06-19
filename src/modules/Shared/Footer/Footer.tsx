import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Divider sx={{mt: 4}}/>
      <Box sx={{py: 4}}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Brand */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#3252DF",
                  mb: 1,
                }}
              >
                Stay<span style={{ color: "#152C5B" }}>cation.</span>
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  color: "#B0B0B0",
                  maxWidth: 240,
                  lineHeight: 1.8,
                }}
              >
                We kaboom your beauty holiday instantly and memorable.
              </Typography>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 2 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#152C5B",
                  mb: 2,
                }}
              >
                For Beginners
              </Typography>

              <FooterLink href="#">New Account</FooterLink>
              <FooterLink href="#">Start Booking a Room</FooterLink>
              <FooterLink href="#">Use Payments</FooterLink>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 2 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#152C5B",
                  mb: 2,
                }}
              >
                Explore Us
              </Typography>

              <FooterLink href="#">Our Careers</FooterLink>
              <FooterLink href="#">Privacy</FooterLink>
              <FooterLink href="#">Terms & Conditions</FooterLink>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 4 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "#152C5B",
                  mb: 2,
                }}
              >
                Connect Us
              </Typography>

              <FooterLink href="#">
                support@staycation.id
              </FooterLink>

              <FooterLink href="#">
                021 - 2208 - 1996
              </FooterLink>

              <Typography
                variant="body2"
                sx={{
                  color: "#B0B0B0",
                  lineHeight: 2,
                }}
              >
                Staycation, Kemang, Jakarta
              </Typography>
            </Grid>
          </Grid>

          <Box
            sx={{
              textAlign: "center",
              mt: 6,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#B0B0B0",
              }}
            >
              Copyright 2019 • All rights reserved • Staycation
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}

function FooterLink({href,children}: {href: string;children: React.ReactNode}) {
  return (
    <Link
      to={href}
      style={{
        textDecoration: "none",
        display: "block",
        color: "#B0B0B0",
        marginBottom: 1,
      }}
    >
      {children}
    </Link>
  );
}
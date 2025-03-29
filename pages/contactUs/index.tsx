import React, { useState, useEffect } from "react";
import {Box,Typography,Paper,Grid,Avatar,Link,} from "@mui/material";
import { keyframes } from "@emotion/react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Loader from "@/layouts/header/Loader";


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const ContactUsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffcccc, #ff6666)",
        py: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={10} lg={8} xl={6}>
          <Paper
            elevation={10}
            sx={{
              padding: { xs: 3, md: 6 },
              borderRadius: 3,
              background: "white",
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
              animation: `${fadeIn} 1s ease-out`,
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                mb: 4,
                color: "#d32f2f",
                fontWeight: "bold",
              }}
            >
              Contact Us
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              {/* Email */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                  borderRadius: 2,
                  background: "#fff5f5",
                  "&:hover": {
                    animation: `${pulse} 0.5s ease`,
                  },
                }}
              >
                <Avatar sx={{ bgcolor: "#d32f2f", width: 56, height: 56 }}>
                  <EmailIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h5" color="text.secondary">
                    Email
                  </Typography>
                  <Link
                    href="mailto:mainakbhadra052@gmail.com"
                    underline="hover"
                    color="inherit"
                  >
                    <Typography variant="h6">
                      mainakbhadra052@gmail.com
                    </Typography>
                  </Link>
                </Box>
              </Box>

              {/* Phone */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                  borderRadius: 2,
                  background: "#fff5f5",
                  "&:hover": {
                    animation: `${pulse} 0.5s ease`,
                  },
                }}
              >
                <Avatar sx={{ bgcolor: "#d32f2f", width: 56, height: 56 }}>
                  <PhoneIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h5" color="text.secondary">
                    Phone
                  </Typography>
                  <Link href="tel:+919804025681" underline="hover" color="inherit">
                    <Typography variant="h6">
                      +91 9804025681
                    </Typography>
                  </Link>
                </Box>
              </Box>

              {/* Address */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 3,
                  borderRadius: 2,
                  background: "#fff5f5",
                  "&:hover": {
                    animation: `${pulse} 0.5s ease`,
                  },
                }}
              >
                <Avatar sx={{ bgcolor: "#d32f2f", width: 56, height: 56 }}>
                  <LocationOnIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h5" color="text.secondary">
                    Address
                  </Typography>
                  <Typography variant="h6">
                    Webskitters Technology Solutions Pvt. Ltd.
                  </Typography>
                  <Typography variant="h6">
                    Salt Lake Sector V, Kolkata
                  </Typography>
                  <Typography variant="h6">West Bengal, India</Typography>
                </Box>
              </Box>

              {/* Map */}
              <Box
                sx={{
                  height: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                  mt: 2,
                }}
              >
                <iframe
                  title="Webskitters Kolkata Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3684.322069894545!2d88.4286143153435!3d22.5683857381505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b020703c0d%3A0xece6f8e5f9c5b0e5!2sWebskitters%20Technology%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1623935400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUsPage;
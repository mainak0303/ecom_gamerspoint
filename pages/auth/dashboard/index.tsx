import React from "react";
import { Box, Typography, Avatar, CircularProgress, Paper, Grid } from "@mui/material";
import { useDashboardQuery } from "@/customHooks/query/auth.query.hooks";
import { dashboardProps } from "@/typescript/auth.interface";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProfileModal: React.FC<dashboardProps> = () => {
  const {
    data: user,
    isPending: isPendingCategories,
    isError: isErrorCategories,
  } = useDashboardQuery();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffcccc, #ff6666)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 6,
          width: 500,
          borderRadius: 3,
          background: "white",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
          animation: `${fadeIn} 1s ease-out`,
        }}
      >
        <Box textAlign="center">
          <Avatar
            sx={{
              background: "#d32f2f",
              margin: "0 auto",
              width: 56,
              height: 56,
            }}
          >
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography
            variant="h4"
            sx={{ margin: "20px 0", color: "#d32f2f", fontWeight: "bold" }}
          >
            Profile Details
          </Typography>
        </Box>

        {isPendingCategories ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : isErrorCategories ? (
          <Typography color="error" sx={{ mt: 4 }}>
            Error fetching profile details.
          </Typography>
        ) : (
          user && (
            <Box sx={{ mt: 4 }}>
              <Avatar
                src="/c.png"
                alt="Profile Image"
                sx={{
                  width: 170,
                  height: 170,
                  mx: "auto",
                  mb: 4,
                  border: "4px solid #d32f2f",
                  boxShadow: "0px 0px 10px rgba(211, 47, 47, 0.5)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0px 0px 20px rgba(211, 47, 47, 0.8)",
                  },
                }}
              />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1">Name:</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {user.data.name}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1">Email:</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {user.data.email}
                </Typography>
              </Box>
            </Box>
          )
        )}
      </Paper>
    </Grid>
  );
};

export default ProfileModal;
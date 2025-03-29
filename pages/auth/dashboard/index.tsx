import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import Loader from "@/layouts/header/Loader";
import { useDashboardQuery } from "@/customHooks/query/auth.query";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const DashboardPage = () => {
  const router = useRouter();
  const { data, isLoading } = useDashboardQuery();

  const handleUpdatePassword = () => {
    router.push("/auth/update_password");
  };

  if (isLoading) {
    return <Loader />;
  }

  const userData = data?.data || data;
  const welcomeMessage = data?.message || "Welcome to your dashboard";

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
            User Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#d32f2f", mb: 2 }}>
            {welcomeMessage}
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ color: "#d32f2f", mb: 2 }}>
            User Information
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Name:</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {userData?.name || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1">Email:</Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              {userData?.email || "N/A"}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            fullWidth
            sx={{
              marginTop: 4,
              background: "#d32f2f",
              "&:hover": { background: "#b71c1c" },
              py: 1.5,
              fontSize: "1rem",
            }}
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default DashboardPage;
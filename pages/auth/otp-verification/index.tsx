import { useOtpMutation } from "@/customHooks/query/auth.query.hooks";
import { useState } from "react";
import { useRouter } from "next/router";
import { FieldValues, useForm } from "react-hook-form";
import {  Box,  Button,  Grid,  TextField,  Typography,  CircularProgress,  Paper,} from "@mui/material";
import { keyframes } from "@emotion/react";
import { OTpProps } from "@/typescript/auth.interface";
import toast from "react-hot-toast";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const VerifyOTP: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTpProps>();
  const { mutate, isPending } = useOtpMutation();
  const [email, setEmail] = useState("");
  const router = useRouter();

  const onSubmit = (formData: FieldValues) => {
    const { otp } = formData as OTpProps;

    if (!email) {
      toast.error("Please enter your email before verifying OTP.");
      return;
    }

    const requestData = { email, otp };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("OTP verified successfully!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      },
      onError: () => {
        toast.error("Invalid OTP. Please try again.");
      },
    });
  };

  return (
    <>
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
            width: 400,
            borderRadius: 3,
            background: "white",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h4"
              sx={{ margin: "20px 0", color: "#d32f2f", fontWeight: "bold" }}
            >
              Verify OTP
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Enter the OTP sent to your email.
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              sx={{ mb: 3 }}
            />

            <TextField
              {...register("otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be 4 digits",
                },
                maxLength: {
                  value: 4,
                  message: "OTP must be 4 digits",
                },
              })}
              label="OTP"
              placeholder="Enter OTP"
              fullWidth
              margin="normal"
              error={!!errors.otp}
              helperText={errors.otp?.message}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                margin: "20px 0",
                background: "#d32f2f",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { background: "#b71c1c" },
                py: 1.5,
                fontSize: "1rem",
              }}
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Verify OTP"
              )}
            </Button>

            <Button
              variant="text"
              fullWidth
              sx={{
                color: "#d32f2f",
                fontWeight: "bold",
                textTransform: "none",
                mt: 2,
                fontSize: "1rem",
              }}
              onClick={() => router.push("/auth/login")}
            >
              Back to Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default VerifyOTP;
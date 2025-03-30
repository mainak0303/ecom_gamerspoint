import { useRegisterMutation } from "@/customHooks/query/auth.query.hooks";
import { useState } from "react";
import {TextField,Button,Box,Typography,IconButton,CircularProgress,} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { registerProps } from "@/typescript/auth.interface";
import toast from "react-hot-toast";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Registration: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerProps>();

  const { mutate, isPending } = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = async (formData: FieldValues) => {
    const { name, email, password } = formData as registerProps;

    const requestData = { name, email, password };

    mutate(requestData, {
      onSuccess: () => {
        toast.success("Registration successful!");
        console.log("Registration successful!");
        router.push("/auth/otp-verification");
      },

      onError: (error) => {
        toast.error("Registration failed. Please check your credentials.");
        console.error("Error:", error);
      },
    });
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", background: "linear-gradient(to right, #ffcccc, #ff6666)", p: 2 }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            maxWidth: 500,
            width: "100%",
            background: "white",
            borderRadius: 3,
            boxShadow: "0 8px 30px rgba(0,0,0,0.1)",
            p: 5,
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 700, color: "#d32f2f" }}>
            Create Your Account
          </Typography>

          {/* Name Field */}
          <TextField
            {...register("name", { required: "Name is required" })}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          {/* Email Field */}
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email format" },
            })}
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          {/* Password Field */}
          <Box sx={{ position: "relative", mt: 2 }}>
            <TextField
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters long" },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message: "Password must contain at least one letter, one number, and one special character",
                },
              })}
              label="Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <IconButton
              onClick={togglePasswordVisibility}
              sx={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontWeight: "bold", backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#b71c1c" } }}
            disabled={isPending}
          >
            {isPending ? <CircularProgress size={20} color="inherit" /> : "Register"}
          </Button>

          {/* Login Link */}
          <Button
            variant="text"
            fullWidth
            onClick={() => router.push("/auth/login")}
            sx={{ mt: 1, textTransform: "none", color: "#d32f2f", fontWeight: 600 }}
          >
            Already have an account? Login
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Registration;
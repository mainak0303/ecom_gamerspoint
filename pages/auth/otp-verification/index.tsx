import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { keyframes } from "@emotion/react";
import { useVerifyEmailMutation } from "@/customHooks/query/auth.query";
import { IVerifyOtpProps } from "@/typescript/auth.interface";
import Loader from "@/layouts/header/Loader";


const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ForgotPasswordEmailConfirmation: React.FC = () =>
{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IVerifyOtpProps>();

  const router = useRouter();
  const { mutate, isPending } = useVerifyEmailMutation();
  const [ isRedirecting, setIsRedirecting ] = useState( false );

  const onSubmit = async ( data: IVerifyOtpProps ) =>
  {
    mutate( data, {
      onSuccess: ( res ) =>
      {
        const { status } = res || {};
        if ( status )
        {
          setIsRedirecting( true );
          setTimeout( () =>
          {
            router.push( "/auth/login" );
          }, 2000 );
        }
      },
    } );
  };

  return (
    <>
      {/* Show loader if redirecting */ }
      { isRedirecting && <Loader /> }

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={ {
          minHeight: "100vh",
          background: "linear-gradient(to right, #ffcccc, #ff6666)",
        } }
      >
        <Paper
          elevation={ 10 }
          sx={ {
            padding: 6,
            width: 400,
            borderRadius: 3,
            background: "white",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
            animation: `${ fadeIn } 1s ease-out`,
          } }
        >
          <Box textAlign="center">
            <Typography
              variant="h4"
              sx={ { margin: "20px 0", color: "#d32f2f", fontWeight: "bold" } }
            >
              Verify OTP
            </Typography>
            <Typography variant="body1" sx={ { mb: 3 } }>
              Enter the OTP sent to your email.
            </Typography>
          </Box>

          <form onSubmit={ handleSubmit( onSubmit ) }>
            {/* Email Field */ }
            <TextField
              { ...register( "email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              } ) }
              label="Email"
              placeholder="Enter your email"
              fullWidth
              margin="normal"
              error={ !!errors.email }
              helperText={ errors.email?.message }
              sx={ { mb: 3 } }
            />

            {/* OTP Field */ }
            <TextField
              { ...register( "otp", {
                required: "OTP is required",
                minLength: {
                  value: 4,
                  message: "OTP must be 4 digits",
                },
                maxLength: {
                  value: 4,
                  message: "OTP must be 4 digits",
                },
              } ) }
              label="OTP"
              placeholder="Enter OTP"
              fullWidth
              margin="normal"
              error={ !!errors.otp }
              helperText={ errors.otp?.message }
              sx={ { mb: 3 } }
            />

            {/* Submit Button */ }
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={ {
                margin: "20px 0",
                background: "#d32f2f",
                color: "#fff",
                fontWeight: "bold",
                "&:hover": { background: "#b71c1c" },
                py: 1.5,
                fontSize: "1rem",
              } }
              disabled={ isPending || isRedirecting }
            >
              { isPending || isRedirecting ? "Verifying..." : "Verify OTP" }
            </Button>

            {/* Back to Login Link */ }
            <Button
              variant="text"
              fullWidth
              sx={ {
                color: "#d32f2f",
                fontWeight: "bold",
                textTransform: "none",
                mt: 2,
                fontSize: "1rem",
              } }
              onClick={ () => router.push( "/auth/login" ) }
            >
              Back to Login
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default ForgotPasswordEmailConfirmation;
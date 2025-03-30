import { Button, Paper, TextField, Typography, Avatar, Box, IconButton, Grid, } from "@mui/material";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "@/customHooks/query/auth.query.hooks";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import toast from "react-hot-toast";
import { loginProps } from "@/typescript/auth.interface";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Login: React.FC = () =>
{
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<loginProps>();
  const router = useRouter();
  const { mutate, isPending } = useLoginMutation();
  const [ showPassword, setShowPassword ] = useState( false );
  const [ loading, setLoading ] = useState( false );

  const togglePasswordVisibility = () =>
  {
    setShowPassword( ( prev ) => !prev );
  };

  const onsubmit = async ( formData: FieldValues ) =>
  {
    const { email, password } = formData as { email: string; password: string };
    setLoading( true );

    const formdata = new FormData();
    formdata.append( "email", email );
    formdata.append( "password", password );

    mutate( formData, {
      onSuccess: ( res ) =>
      {
        console.log( "Login Mutation Response:", res );

        if ( res?.token )
        {
          console.log( "Token:", res.token );
          console.log( "User:", res.user );

          Cookies.set( "token", res.token, { expires: 7 } );
          toast.success( "Login successful! Welcome back." );

          setTimeout( () =>
          {
            setLoading( false );
            router.push( "/cms/list" );
          }, 500 );
        } else
        {
          setLoading( false );
          toast.error( "Invalid credentials! Please try again." );
          console.log( "Login failed. Please try again." );
        }
      },
      onError: () =>
      {
        setLoading( false );
        toast.error(
          "Login failed. Please check your credentials and try again."
        );
        console.error(
          "Login failed. Please check your credentials and try again."
        );
      },
    } );
    console.log( formData );
    reset();
  };

  return (
    <>
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
            <Avatar sx={ { background: "#d32f2f", margin: "0 auto", width: 56, height: 56 } }>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              sx={ { margin: "20px 0", color: "#d32f2f", fontWeight: "bold" } }
            >
              Sign In
            </Typography>
          </Box>

          <form onSubmit={ handleSubmit( onsubmit ) }>
            <TextField
              { ...register( "email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email format",
                },
              } ) }
              label="Email"
              placeholder="Enter email"
              fullWidth
              margin="normal"
              error={ !!errors.email }
              helperText={ errors.email?.message }
              sx={ { mb: 3 } }
              disabled={ isPending || loading }
            />

            <Box sx={ { position: "relative", width: "100%" } }>
              <TextField
                { ...register( "password", { required: "Password is required" } ) }
                label="Password"
                type={ showPassword ? "text" : "password" }
                fullWidth
                margin="normal"
                error={ !!errors.password }
                helperText={ errors.password?.message }
                sx={ { mb: 3 } }
                disabled={ isPending || loading }
              />
              <IconButton
                onClick={ togglePasswordVisibility }
                sx={ {
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                } }
                disabled={ isPending || loading }
              >
                { showPassword ? <VisibilityOff /> : <Visibility /> }
              </IconButton>
            </Box>

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
              disabled={ isPending || loading }
              startIcon={
                isPending ? (
                  <RotateLeftIcon sx={ { animation: `${ spin } 1s linear infinite` } } />
                ) : null
              }
            >
              { isPending ? "Loading..." : "Sign In" }
            </Button>

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
              onClick={ () => router.push( "/auth/registration" ) }
              disabled={ isPending || loading }
            >
              Do not have an account? Register here
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Login;
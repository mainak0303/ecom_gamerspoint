import { useForm, FieldValues } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { Avatar, Button, Grid, IconButton, TextField, Typography, Paper, Box, } from "@mui/material";
import { Visibility, VisibilityOff, LockOutlined as LockOutlinedIcon, RotateLeft, } from "@mui/icons-material";
import { useUserStore } from "@/toolkit/store/store";
import { updatePassProps } from "@/typescript/auth.interface";
import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "@/customHooks/query/auth.query.hooks";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const UpdatePassword: React.FC = () =>
{
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updatePassProps>( {
    defaultValues: { user_id: "", password: "" },
  } );
  const { mutate, isPending } = useUpdatePasswordMutation();
  const router = useRouter();
  const { user } = useUserStore();
  const userId = user?.id;

  const [ showPassword, setShowPassword ] = useState( false );
  const [ loading, setLoading ] = useState( false );

  const togglePasswordVisibility = () =>
  {
    setShowPassword( ( prev ) => !prev );
  };

  const onSubmit = ( formData: FieldValues ) =>
  {
    if ( !userId )
    {
      toast.error( "User not found. Please log in again." );
      return;
    }

    setLoading( true );
    const { password } = formData as updatePassProps;
    const requestData = { user_id: userId, password };

    mutate( requestData, {
      onSuccess: () =>
      {
        toast.success( "Password updated successfully! Please log in." );
        setTimeout( () =>
        {
          router.push( "/auth/login" );
        }, 1000 );
      },
      onError: ( error ) =>
      {
        console.error( "Update Password Error:", error );
        setLoading( false );
        toast.error( "Failed to update password. Please try again." );
      },
    } );
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
            <Avatar sx={ {
              background: "#d32f2f",
              margin: "0 auto",
              width: 56,
              height: 56
            } }>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h4"
              sx={ { margin: "20px 0", color: "#d32f2f", fontWeight: "bold" } }
            >
              Update Password
            </Typography>
          </Box>

          <form onSubmit={ handleSubmit( onSubmit ) }>
            <TextField
              fullWidth
              label="User ID"
              margin="normal"
              { ...register( "user_id", { required: "User ID is required" } ) }
              disabled={ isPending || loading }
              sx={ { mb: 3 } }
            />

            <Box sx={ { position: "relative", width: "100%" } }>
              <TextField
                { ...register( "password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                } ) }
                label="New Password"
                type={ showPassword ? "text" : "password" }
                fullWidth
                error={ !!errors.password }
                helperText={ errors.password?.message }
                margin="normal"
                disabled={ isPending || loading }
                sx={ { mb: 3 } }
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
                  <RotateLeft sx={ { animation: `${ spin } 1s linear infinite` } } />
                ) : null
              }
            >
              { isPending ? "Updating..." : "Update Password" }
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
              onClick={ () => router.push( "/auth/login" ) }
              disabled={ isPending || loading }
            >
              Remembered your password? Sign In
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default UpdatePassword;
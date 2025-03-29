import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { loginMutation } from '@/customHooks/query/auth.query';
import { Avatar, Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { keyframes } from "@emotion/react";
import { ILoginProps } from '@/typescript/auth.interface';
import Loader from '@/layouts/header/Loader';
import toast from "react-hot-toast";



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
    const [ cookies, , removeCookie ] = useCookies( [ "show_login_toast" ] );
    const router = useRouter();

    useEffect( () =>
    {
        const handleRouteChange = () =>
        {
            if ( cookies.show_login_toast )
            {
                toast.error( "Please login to access this content" );
                removeCookie( "show_login_toast", { path: "/" } );
            }
        };
        if ( cookies.show_login_toast )
        {
            toast.error( "Please login to access this content" );
            removeCookie( "show_login_toast", { path: "/" } );
        }
        router.events.on( 'routeChangeComplete', handleRouteChange );

        return () =>
        {
            router.events.off( 'routeChangeComplete', handleRouteChange );
        };
    }, [ cookies.show_login_toast, removeCookie, router.events ] );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ILoginProps>();

    const { mutate, isPending } = loginMutation();
    const [ showPassword, setShowPassword ] = useState( false );
    const [ loading, setLoading ] = useState( false );

    const togglePasswordVisibility = () =>
    {
        setShowPassword( ( prev ) => !prev );
    };

    const onSubmit = async ( formData: FieldValues ) =>
    {
        const { email, password } = formData as ILoginProps;

        setLoading( true );

        mutate(
            { email, password, },
            {
                onSuccess: ( data ) =>
                {
                    console.log( "Login success data:", data );
                    if ( data?.status && data?.token )
                    {
                        setTimeout( () =>
                        {
                            setLoading( false );
                            router.push( "/cms/list" );
                        }, 2000 );
                    } else
                    {
                        setLoading( false );
                    }
                },
                onError: () =>
                {
                    setLoading( false );
                },
            }
        );

        reset();
    };

    return (
        <>
            {/* Show loader when loading */ }
            { loading && <Loader /> }

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
                            placeholder="Enter email"
                            fullWidth
                            margin="normal"
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                            sx={ { mb: 3 } }
                            disabled={ isPending || loading }
                        />

                        {/* Password Field */ }
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
                            disabled={ isPending || loading }
                            startIcon={
                                isPending ? (
                                    <RotateLeftIcon sx={ { animation: `${ spin } 1s linear infinite` } } />
                                ) : null
                            }
                        >
                            { isPending ? "Loading..." : "Sign In" }
                        </Button>

                        {/* Register Link */ }
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
                            Don't have an account? Register here
                        </Button>
                    </form>
                </Paper>
            </Grid>
        </>
    );
};

export default Login;
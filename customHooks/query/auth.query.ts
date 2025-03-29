import { useMutation, UseMutationResult, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useGlobalHooks } from "../globalHooks/globalHooks";
import { Cookies } from "react-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { RegisterResponse, VerifyOtpResponse, LoginResponse, IRegisterProps, IVerifyOtpProps, ILoginProps, DashboardResponse, updatePassProps, } from "@/typescript/auth.interface";
import { dashboardFn, loginFn, registerFn, updatePasswordFn, verifyEmailFn } from "@/api/functions/auth.api";
import { useUserStore } from "@/toolkit/store/store";


// Registration Mutation
export const registerMutation = (): UseMutationResult<RegisterResponse, unknown, IRegisterProps> =>
{
    const { queryClient } = useGlobalHooks();
    return useMutation<RegisterResponse, unknown, IRegisterProps>( {
        mutationFn: registerFn,
        onSuccess: ( res ) =>
        {
            const { status, message, data } = res || {};
            if ( status )
            {
                toast.success( message || "Registration successful! Please check your email for verification." );
                console.log( "User data:", data );
            } else
            {
                toast.error( message || "Registration failed. Please try again." );
            }
            queryClient.invalidateQueries( { queryKey: [ "REGISTER" ] } );
        },
        onError: ( error: any ) =>
        {
            if ( error.response?.status === 400 )
            {
                toast.error( "Invalid input. Please check your details." );
            } else if ( error.response?.status === 409 )
            {
                toast.error( "Email already registered. Please use a different email." );
            } else
            {
                toast.error( "Registration failed. Please try again." );
            }
            queryClient.invalidateQueries( { queryKey: [ "REGISTER" ] } );
        },
    } );
};

// Verify OTP Query
export const useVerifyEmailMutation = (): UseMutationResult<VerifyOtpResponse, Error, IVerifyOtpProps> =>
{
    const { queryClient } = useGlobalHooks();
    return useMutation<VerifyOtpResponse, Error, IVerifyOtpProps>( {
        mutationFn: verifyEmailFn,
        onSuccess: ( res ) =>
        {
            const { status, message } = res || {};
            if ( status )
            {
                toast.success( message || "OTP verified successfully!" );
            } else
            {
                toast.error( message || "OTP verification failed." );
            }
            queryClient.invalidateQueries( { queryKey: [ "VerifyOTP" ] } );
        },
        onError: () =>
        {
            toast.error( "Something went wrong with OTP verification." );
            queryClient.invalidateQueries( { queryKey: [ "VerifyOTP" ] } );
        },
    } );
};


// Login Mutation
export const loginMutation = (): UseMutationResult<LoginResponse, unknown, ILoginProps> =>
{
    const { queryClient } = useGlobalHooks();
    const { setToken, setUser } = useUserStore();

    return useMutation<LoginResponse, unknown, ILoginProps>( {
        mutationFn: loginFn,
        onSuccess: ( res ) =>
        {
            const { token, status, message, user } = res || {};

            if ( status && token )
            {
                setToken( token );
                setUser( user ? { id: user.email } : null );
                toast.success( message || "Login successful!" );
            } else
            {
                toast.error( message || "Login failed. Please try again." );
            }
            queryClient.invalidateQueries( { queryKey: [ "LOGIN" ] } );
        },
        onError: ( error: any ) =>
        {
            if ( error.response?.status === 400 )
            {
                toast.error( "Invalid email or password." );
            } else if ( error.response?.status === 401 )
            {
                toast.error( "Unauthorized. Please check your credentials." );
            } else
            {
                toast.error( "Login failed. Please try again." );
            }
            queryClient.invalidateQueries( { queryKey: [ "LOGIN" ] } );
        },
    } );
};

// Update Password Mutation
export const updatePasswordMutation = (): UseMutationResult<any, any, updatePassProps, unknown> =>
{
    const { queryClient } = useGlobalHooks();
    const router = useRouter();

    return useMutation( {
        mutationFn: updatePasswordFn,
        onSuccess: ( res ) =>
        {
            if ( res?.message )
            {
                toast.success( res?.message || "Password updated successfully!" );
                setTimeout( () => router.push( "/auth/dashboard" ), 1500 );
            } else
            {
                toast.error( res?.message || "Failed to update password" );
            }
            queryClient.invalidateQueries( { queryKey: [ "UPDATEPASSWORD" ] } );
        },
        onError: ( error: any ) =>
        {
            console.error( "Update error:", error );
            const errorMessage = error.response?.data?.message || "Failed to update password";

            if ( error.response?.status )
            {
                toast.error( "Session expired. Please login again." );
                router.push( "/auth/login" );
            } else
            {
                toast.error( errorMessage );
            }
        }
    } );
};

// Dashboard
export const useDashboardQuery = (): UseQueryResult<DashboardResponse, unknown> =>
{
    return useQuery( {
        queryKey: [ "DASHBOARD" ],
        queryFn: dashboardFn,

    } );
};
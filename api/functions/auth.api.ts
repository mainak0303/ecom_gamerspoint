import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import { IRegisterProps, RegisterResponse, IVerifyOtpProps, VerifyOtpResponse, ILoginProps, LoginResponse, DashboardResponse, updatePassProps, } from "@/typescript/auth.interface";

// Registration
export const registerFn: MutationFunction<RegisterResponse, IRegisterProps> = async ( payload ) =>
{
    const response = await axiosInstance.post<RegisterResponse>( endPoints.auth.registration, payload, {
        headers: {
            "Content-Type": "application/json",
        },
    } );
    console.log( "Registration response:", response );
    return response.data;
};

// Verify OTP
export const verifyEmailFn: MutationFunction<VerifyOtpResponse, IVerifyOtpProps> = async ( {
    email,
    otp,
}: IVerifyOtpProps ): Promise<VerifyOtpResponse> =>
{
    const response = await axiosInstance.post<VerifyOtpResponse>( endPoints.auth.verify_otp, {
        email,
        otp,
    } );
    console.log( "Verify OTP response:", response );
    return response.data;
};

// Login
export const loginFn: MutationFunction<LoginResponse, ILoginProps> = async ( payload ) =>
{
    const response = await axiosInstance.post<LoginResponse>( endPoints.auth.login, payload );
    console.log( "Login response:", response );
    return response.data;
};

// Update Password
export const updatePasswordFn: MutationFunction<any,updatePassProps> = async ( payload ) =>
{
    const response = await axiosInstance.post<updatePassProps>( endPoints.auth.update_password, payload );
    console.log( "Update password response:", response );
    return response.data;
};

//dashboard

export const dashboardFn = async (): Promise<DashboardResponse> =>
{
    const response = await axiosInstance.get( endPoints.auth.dashboard );
    console.log( "Dashboard response:", response );
    return response.data;
};
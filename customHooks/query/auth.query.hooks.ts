import Cookies from "js-cookie";
import { useMutation, useQuery, UseMutationResult, UseQueryResult, } from "@tanstack/react-query";
import { loginFn, registerFn, verifyOtpFn, updatePasswordFn, fetchDashboard, } from "../../api/functions/auth.api";
import { useUserStore } from "@/toolkit/store/store";
import { useRouter } from "next/router";

//login
export const useLoginMutation = (): UseMutationResult<any, unknown, any, unknown> =>
{
  const { setToken, setUser } = useUserStore();
  const router = useRouter();

  return useMutation( {
    mutationFn: loginFn,
    onSuccess: ( res ) =>
    {
      if ( res?.token )
      {
        Cookies.set( "token", res.token, { expires: 7 } );
        setToken( res.token );
        setUser( res.user );
      }
    },
    onError: () => { },
  } );
};

//registration
export const useRegisterMutation = (): UseMutationResult<any, unknown, any, unknown> =>
{
  const { setToken, setUser } = useUserStore();

  return useMutation( {
    mutationFn: registerFn,
    onSuccess: ( res ) =>
    {
      console.log( "Register Mutation Response:", res );
      if ( res?.user )
      {
        setUser( res.user );
        console.log( "user:", res.user );
      }
    },
    onError: ( error: any ) =>
    {
      console.error( "Register Mutation Error:", error );
    },
  } );
};

//otp verify
export const useOtpMutation = (): UseMutationResult<any, unknown, any, unknown> =>
{
  return useMutation( {
    mutationFn: verifyOtpFn,
    onSuccess: () => { },
    onError: () => { },
  } );
};

//dashboard
export const useDashboardQuery = (): UseQueryResult<any, unknown> =>
{
  return useQuery( {
    queryKey: [ "DASHBOARD" ],
    queryFn: fetchDashboard,
  } );
};

//update password
export const useUpdatePasswordMutation = (): UseMutationResult<any, unknown, any, unknown> =>
{
  return useMutation( {
    mutationFn: updatePasswordFn,
    onSuccess: () => { },
    onError: () => { },
  } );
};

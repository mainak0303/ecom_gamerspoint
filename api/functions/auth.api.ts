import { MutationFunction } from "@tanstack/react-query";
import axiosInstance from "../axios/axios";
import { endPoints } from "../endPoints/endPoints";
import Cookies from "js-cookie";
import {
  dashboardProps,
  loginProps,
  OTpProps,
  registerProps,
  updatePassProps,
} from "@/typescript/auth.interface";

export const loginFn: MutationFunction<loginProps, unknown> = async (
  payload
) => {
  const { data } = await axiosInstance.post(endPoints.auth.login, payload);
  return data;
};

export const registerFn: MutationFunction<registerProps, unknown> = async (
  payload
) => {
  const { data } = await axiosInstance.post(endPoints.auth.register, payload);
  console.log("Register API Response:", data);
  return data;
};

export const verifyOtpFn: MutationFunction<OTpProps, unknown> = async (
  payload
) => {
  const { data } = await axiosInstance.post(endPoints.auth.verifyOtp, payload);
  return data;
};

export const fetchDashboard: MutationFunction<
  dashboardProps,
  unknown
> = async () => {
  const { data } = await axiosInstance.get(endPoints.auth.dashboard, {
    headers: {
      "x-access-token": Cookies.get("token") || "",
    },
  });
  return data;
};

export const updatePasswordFn: MutationFunction<any, updatePassProps> = async (
  payload
) => {
  console.log("API Call Initiated with:", payload);
  try {
    const response = await axiosInstance.post(
      endPoints.auth.forgotPassword,
      payload,
      {
        headers: {
          "x-access-token": Cookies.get("token") || "",
        },
      }
    );

    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update Password API Error:", error);
    throw error;
  }
};

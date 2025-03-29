// Login  Interface
export interface ILoginProps
{
    email: string;
    password: string;
}

// Login  Interface
export interface LoginResponse
{
    token: string;
    message: string;
    status: number;
    user: ILoginProps;
}

// Registration  Interface
export interface IRegisterProps
{
    name: string;
    email: string;
    password: string;
}

// Registration  Interface
export interface RegisterResponse
{
    data: any;
    message: string;
    status: number;
    user: IRegisterProps;
}

// Verify OTP  Interface
export interface IVerifyOtpProps
{
    email: string;
    otp: string;
}

// Verify OTP  Interface
export interface VerifyOtpResponse
{
    message: string;
    status: number;
    user: IVerifyOtpProps;
}

// Update Password  Interface
  export interface updatePassProps  {
    user_id: string;
    password: string;
    token: string;
    message: string;
    status: number;
  }
  

// Dashboard Interface
export interface DashboardResponse {
    message: string;
    data: {
      _id: string;
      name: string;
      email: string;
    };
    email?: string;
    name?: string;
    _id?: string;
  }
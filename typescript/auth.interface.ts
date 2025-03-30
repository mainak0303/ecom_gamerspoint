export interface IloginProps
{
  id: string;
  email: string;
  password: string;
  token: string;
  message: string;
  status: number;
  data: object;
}
export interface IregisterProps
{
  id: string;
  name: string;
  email: string;
  password: string;
  token: string;
  message: string;
  status: number;
}
export interface loginProps extends IloginProps
{
  user: IloginProps;
}

export interface registerProps extends IregisterProps
{
  user: IregisterProps;
}

export interface IdashboardProps
{
  name: string;
  email: string;
  createdAt: Date;
  token: string;
  message: string;
  status: number;
  data: object;
}
export interface dashboardProps extends IdashboardProps
{
  user: IdashboardProps;
}

export interface profilemodalProps
{
  isOpen: boolean;
  onClose: () => void;
}

export interface IOTpProps
{
  email: string;
  otp: number;
  token: string;
  message: string;
  status: number;
}
export interface OTpProps extends IOTpProps
{
  user: IOTpProps;
}

export interface IupdatePassProps
{
  user_id: string;
  password: string;
  token: string;
  message: string;
  status: number;
}
export interface updatePassProps extends IupdatePassProps
{
  user: IupdatePassProps;
}

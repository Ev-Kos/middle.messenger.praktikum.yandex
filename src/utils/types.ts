export type TSingInRequest = {
  login: string,
  password: string
}

export type TErrorApi = {
  reason: string;
};

export type TSingUpRequest = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string
}

export type TSingUpResponse = {
  id: number
}

export type TUser = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  phone: string,
  login: string,
  avatar: string,
  email: string
}
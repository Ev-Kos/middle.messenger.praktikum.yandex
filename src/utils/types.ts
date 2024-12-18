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
  email: string,
  role?: string
}

export type TGetChatsRequest = {
  offset: number,
  limit: number,
  title?: string
}

export type TGetChatsResponse = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  created_by: number,
  last_message: {
    user: TUser,
    time: string,
    content: string,
  },
}

export type TCreateChatRequest = {
  title: "string"
}

export type TCreateChatResponse = {
  id: number
}

export type TDeleteChatRequest = {
  chatId: number
}

export type TDeleteChatResponse = {
  userId: number,
  result: {
    id: number,
    title: string,
    avatar: string,
    created_by: number
  }
}

export type TAddOrDeleteUserToChatRequest = {
  users: number[],
  chatId: number
}

export type TUsersSearchRequest = {
  login: string,
}

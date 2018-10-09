interface IGoogleUser {
  createdAt: Date;
  email: string;
  id: string;
  name: string;
}

interface ILocalUSer {
  createdAt: Date;
  email?: string;
  password?: string;
  userName?: string;
}

export interface IUser {
  google?: IGoogleUser;
  local?: ILocalUSer;
}

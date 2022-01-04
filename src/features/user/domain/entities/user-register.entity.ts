interface IUserRegisterProps {
  username: string;
  email: string;
  password: string;
}

export class UserRegister {
  username: string;
  email: string;
  password: string;

  constructor({ username, email, password }: IUserRegisterProps) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

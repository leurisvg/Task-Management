export interface User {
  id: string,
  email: string;
  password: string;
  name: string;
}

export type UserData = Omit<User, 'password'> & { jwt: string };

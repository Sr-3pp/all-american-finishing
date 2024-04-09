export interface User {
  _id?: string;
  email: string;
  password?: string;
  name: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  bio: string;
  gender: string;
  birthday: Date;
  country: string;
  estate: string;
  city: string;
  created: Date;
}
export interface PublicUser {
  bio: string;
  gender: string;
  id: number;
  name: string;
  username: string;
}

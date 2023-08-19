import { Filter } from "../../../interfaces/repository";

export interface CreateUserInput {
  username: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  gender: string;
  birthday: string;
}
export interface UpdateUserInput {
  id: number;
  username: string;
  name: string;
  email: string;
  birthday: string;
  gender: string;
  bio: string;
  city: string;
  country: string;
  estate: string;
  phone: string;
  password: string;
}
export interface ReadUserInput extends Filter {}

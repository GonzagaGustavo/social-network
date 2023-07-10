import { hash } from "bcrypt";

export default class User {
  id: number;
  name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  bio: string;
  gender: string;
  birthday: string;
  country: string;
  estate: string;
  city: string;
  created: Date;

  constructor(
    name: string,
    email: string,
    password: string,
    username: string,
    phone: string,
    bio: string,
    gender: string,
    birthday: string,
    country: string,
    estate: string,
    city: string,
    created: Date,
    id?: number
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.username = username;
    this.phone = phone;
    this.bio = bio;
    this.gender = gender;
    this.birthday = birthday;
    this.country = country;
    this.estate = estate;
    this.city = city;
    this.created = created;
  }

  getuser() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      username: this.username,
      phone: this.phone,
      bio: this.bio,
      gender: this.gender,
      birthday: this.birthday,
      country: this.country,
      estate: this.estate,
      city: this.city,
      created: this.created,
    };
  }
}

import UserRepositoryImpl from "src/interfaces/repositories/User/UserRepositoryImpl";
import User from "../entities/User";

export default class UserUseCases {
  user: User;
  userRepository: UserRepositoryImpl;

  constructor(user: User) {
    this.user = user;
    this.userRepository = new UserRepositoryImpl();
  }

  async validEmail() {
    const tester =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    if (!this.user.email) {
      return false;
    }
    if (this.user.email.length > 256) {
      return false;
    }
    if (!tester.test(this.user.email)) {
      return false;
    }
    const [account, address] = this.user.email.split("@");
    if (account.length > 64) {
      return false;
    }
    const domainParts = address.split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    ) {
      return false;
    }

    const emailExists = await this.userRepository.emailExists(this.user.email);
    if (emailExists) return false;

    return true;
  }

  async validUsername() {
    const usernameExists = await this.userRepository.usernameExists(
      this.user.username
    );
    if (usernameExists) return false;
    if (this.user.username.length > 200) return false;

    return true;
  }

  async validUserBeforeSave() {
    if (this.user.email && this.user.password && this.user.username) {
      if (!(await this.validEmail())) return false;
      if (!(await this.validUsername())) return false;
      if (this.user.name.length > 150) return false;
      if (this.user.phone.length > 50) return false;
      if (this.user.bio.length > 1000) return false;
      if (this.user.gender.length > 50) return false;
      if (this.user.country.length > 80) return false;
      if (this.user.estate.length > 100) return false;
      if (this.user.city.length > 100) return false;

      return true;
    } else {
      return false;
    }
  }
}

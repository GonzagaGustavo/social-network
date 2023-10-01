import { compareSync } from "bcrypt";
import UserRepository from "../../repositories/User/user.repository";
import { LoginInput, LoginOutput } from "./login.dto";
import InvalidParamError from "../../../interfaces/errors/invalid-param";

export default class LoginUseCase {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.paginate({
      where: `AND email='${input.email}'`,
      page: 1,
      search: "",
      order: "",
      limit: 1,
      desc: false,
      more: false,
    });

    if (!user[0]) {
      throw new InvalidParamError("email");
      return;
    }

    if (compareSync(input.password, user[0].password)) {
      return user;
    } else {
      throw new InvalidParamError("password");
    }
  }
}

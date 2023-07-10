import UserRepositoryImpl from "src/interfaces/repositories/User/UserRepositoryImpl";

export default class UserService {
  userRepository: UserRepositoryImpl;

  constructor() {
    this.userRepository = new UserRepositoryImpl();
  }

  async getPublicUserByUsername(username: string) {
    return await this.userRepository.getPublicUserByUsername(username);
  }
}

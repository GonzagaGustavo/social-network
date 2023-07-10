import orm from "src/framework/database";
import User, { PublicUser } from "./User";
import UserRepository from "./UserRepository";

export default class UserRepositoryImpl implements UserRepository {
  async createUser(user: User): Promise<User> {
    const createdUser = await orm.user.create({ data: user });
    return createdUser;
  }

  async getUserById(userId: number): Promise<User> {
    const user = await orm.user.findUnique({ where: { id: userId } });

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await orm.user.findUnique({ where: { email: email } });

    return user;
  }

  async getUserByUsername(username: string): Promise<User> {
    const user = await orm.user.findUnique({ where: { username: username } });

    return user;
  }

  async getPublicUserByUsername(username: string): Promise<PublicUser> {
    const user = await orm.user.findUnique({
      where: { username: username },
      select: {
        password: false,
        country: false,
        phone: false,
        city: false,
        estate: false,
        email: false,
        bio: true,
        birthday: false,
        gender: true,
        id: true,
        name: true,
        username: true,
      },
    });

    return user;
  }

  async usernameExists(username: string): Promise<boolean> {
    const exists = await orm.user.findUnique({ where: { username: username } });

    if (!exists) return false;

    return true;
  }

  async emailExists(email: string): Promise<boolean> {
    const exists = await orm.user.findUnique({ where: { email: email } });

    if (!exists) return false;

    return true;
  }

  async updateUser(user: User): Promise<User> {
    const userUpdated = await orm.user.update({
      data: user,
      where: { id: user.id },
    });

    return userUpdated;
  }

  async deleteUser(userId: number): Promise<void> {
    await orm.user.deleteMany({ where: { id: userId } });
  }
}

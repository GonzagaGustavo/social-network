import User from "./User";

export default interface UserRepository {
  createUser(user: User): Promise<User>;
  getUserById(userId: number): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
  updateUser(user: User): Promise<User>;
  deleteUser(userId: number): Promise<void>;
}

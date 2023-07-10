import { Request, Router } from "express";
import UserService from "src/domain/services/UserService";
import Controller from "src/interfaces/controller";
import MissingParamError from "src/interfaces/controller/errors/missing-param-error";
import { routeAdapter } from "../adapters/route";

export default class UserController extends Controller {
  userRepository: UserService;

  constructor(router: Router) {
    super();
    this.userRepository = new UserService();

    router.get("/:username", routeAdapter(this.getPublicUserByUsername));
  }

  async getPublicUserByUsername(httpRequest: Request) {
    const username = httpRequest.params.username;
    if (!username) return this.badRequest(new MissingParamError("username"));

    const user = await this.userRepository.getPublicUserByUsername(username);

    return this.ok(user);
  }
}

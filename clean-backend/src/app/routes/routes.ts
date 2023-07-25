import { Router } from "express";
import RegisterRoute from "./register-route";
import EntityController from "../../domain/controllers/entity/Entity";
import UserController from "../../domain/controllers/user/User";

export default (router: Router) => {
  const registerRoute = new RegisterRoute(router);

  registerRoute.addRoute({
    route: "/user",
    controller: new UserController(),
    params: { post: { login: null } },
  });

  registerRoute.addRoute({
    route: "/entity",
    controller: new EntityController(),
  });
};

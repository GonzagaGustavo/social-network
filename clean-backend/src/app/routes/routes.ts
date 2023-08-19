import { Router } from "express";
import RegisterRoute from "./register-route";
import CountryController from "../../domain/controllers/country/Country";
import UserController from "../../domain/controllers/user/User";

export default (router: Router) => {
  const registerRoute = new RegisterRoute(router);

  registerRoute.addRoute({
    route: "/country",
    controller: new CountryController(),
  });

  registerRoute.addRoute({
    route: "/user",
    controller: new UserController(),
  });
};

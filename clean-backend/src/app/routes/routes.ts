import { Router } from "express";
import RegisterRoute from "./register-route";
import CountryController from "../../domain/controllers/country/Country";

export default (router: Router) => {
  const registerRoute = new RegisterRoute(router);

  registerRoute.addRoute({
    route: "/country",
    controller: new CountryController(),
  });
};

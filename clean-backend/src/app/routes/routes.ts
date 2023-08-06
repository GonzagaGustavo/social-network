import { Router } from "express";
import RegisterRoute from "./register-route";

export default (router: Router) => {
  const registerRoute = new RegisterRoute(router);
};

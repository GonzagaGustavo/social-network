import { Request, Response, Router } from "express";
import Controller, { HttpRequest } from "../../interfaces/controller";
import multer from "multer";

type Params = {
  get?: object | null;
  post?: object | null;
  put?: object | null;
  delete?: object | null;
} | null;

type RegisterRouteInput = {
  route: string;
  params?: Params;
  controller: Controller<any>;
};
// (httpRequest: HttpRequest) => Promise<ResponseObject>;

type RouteFunction = {
  routeFunctionName: string;
  controller: Controller<any>;
};

export default class RegisterRoute {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  addRoute({ controller, params, route }: RegisterRouteInput) {
    this.router.get(
      `${route}`,
      this.adaptRoute({ routeFunctionName: "GET", controller })
    );
    this.router.post(
      `${route}`,
      multer().none(),
      this.adaptRoute({ routeFunctionName: "POST", controller })
    );
    this.router.put(
      `${route}`,
      this.adaptRoute({ routeFunctionName: "PUT", controller })
    );
    this.router.delete(
      `${route}/:id`,
      this.adaptRoute({ routeFunctionName: "DELETE", controller })
    );

    if (params) {
      if (params.get) {
        Object.keys(params.get).forEach((paramName) => {
          this.router.get(
            `${route}/:${paramName}`,
            this.adaptRoute({
              routeFunctionName: `${paramName}GET`,
              controller,
            })
          );
        });
      }

      if (params.post) {
        Object.keys(params.post).forEach((paramName) => {
          this.router.post(
            `${route}/:${paramName}`,
            this.adaptRoute({
              routeFunctionName: `${paramName}POST`,
              controller,
            })
          );
        });
      }

      if (params.put) {
        Object.keys(params.put).forEach((paramName) => {
          this.router.put(
            `${route}/:${paramName}`,
            this.adaptRoute({
              routeFunctionName: `${paramName}PUT`,
              controller,
            })
          );
        });
      }

      if (params.delete) {
        Object.keys(params.delete).forEach((paramName) => {
          this.router.delete(
            `${route}/:${paramName}`,
            this.adaptRoute({
              routeFunctionName: `${paramName}DELETE`,
              controller,
            })
          );
        });
      }
    }
  }

  private adaptRoute({ routeFunctionName, controller }: RouteFunction) {
    const _controller: any = controller;
    return async (req: Request, res: Response) => {
      const httpRequest: HttpRequest = {
        body: req.body,
        params: req.params,
        query: req.query,
        user: req.user,
      };
      const response = await _controller[routeFunctionName](httpRequest);

      res.status(response.statusCode).json(response.body);
    };
  }
}

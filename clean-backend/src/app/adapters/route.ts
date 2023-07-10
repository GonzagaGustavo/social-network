import { Request, Response } from "express";
import {
  HttpRequest,
  ResponseObject,
} from "src/interfaces/controller/interface";

export const routeAdapter = (
  callback: (httpRequest: HttpRequest) => Promise<ResponseObject>
) => {
  return async (req: Request, res: Response) => {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    const response = await callback(httpRequest);

    res.status(response.statusCode).send(response.body);
  };
};

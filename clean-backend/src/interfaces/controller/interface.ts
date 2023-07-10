export type ResponseObject = {
  statusCode: number;
  body: any;
};
export type HttpRequest = {
  body: any;
  params: any;
  query: any;
};

export default interface ControllerInterface {
  badRequest(error: Error): ResponseObject;
  serverError(error: Error): ResponseObject;
  unauthorizedError(error: Error): ResponseObject;
  ok(body: any): ResponseObject;
}

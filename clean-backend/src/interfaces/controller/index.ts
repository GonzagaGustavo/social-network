import UnauthorizedError from "./errors/unauthorized-error";
import ControllerInterface from "./interface";

export default abstract class Controller implements ControllerInterface {
  /**
   * @returns statusCode 400
   */
  badRequest(error: Error) {
    return {
      statusCode: 400,
      body: error,
    };
  }

  /**
   * @returns statusCode 500
   */
  serverError(error: any) {
    return {
      statusCode: 500,
      body: error,
    };
  }

  /**
   * @returns statusCode 401
   */
  unauthorizedError() {
    return {
      statusCode: 401,
      body: new UnauthorizedError(),
    };
  }

  /**
   * @returns statusCode 200
   */
  ok(body: any) {
    return {
      statusCode: 200,
      body: body,
    };
  }
}

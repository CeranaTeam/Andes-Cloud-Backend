/* eslint-disable */
import {Request, Response, NextFunction} from "express";
import {FirebaseAuthService} from "../services/FirebaseAuth.service";

// function validateRequestBody<T>(
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   validationFunction: (request: T) => boolean // 接收通用的验证函数作为参数
// ) {
//   const body = req.body as T;

//   if (!validationFunction(body)) {
//     return res.status(400).json({ error: '请求参数无效' });
//   }

//   return next();
// }


async function AuthFilter(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization || "";
    const components = authorizationHeader.split(" ");
    if (components.length !== 2) {
      return res.status(400).send({
        success: false,
        message: "Invalid Token format",
      });
    }
    const token = components[1];
    const authService = new FirebaseAuthService();
    const decodedClaims = await authService.verifyToken(token);
    // const decodedClaims = await admin.auth().verifyIdToken(token);
    req.body.decodedClaims = decodedClaims;

    return next();
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send({success: false, message: "Invalid Token"});
  }
}

export {AuthFilter};

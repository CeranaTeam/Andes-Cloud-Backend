
import {Request, Response, NextFunction} from "express";
import {LocalAuthService} from "../services/LocalAuth.service";

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
    const authService = new LocalAuthService();
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

/* eslint-disable */
import { Request, Response } from "express";
import UserService from "../services/User.service";
import { logger } from "firebase-functions/v1";
import { SuccessResponseData } from "../dtos/Response.dto";
import { UserRegisterDTO } from "../dtos/User.dto";
import { errorStatusMap } from "../errors";


class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const userRegisterDTO: UserRegisterDTO = decodedClaims;
      await this.userService.register(userRegisterDTO);
      res.status(200).json(new SuccessResponseData("成功註冊", userRegisterDTO.uid));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }

  checkUserPoint = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const uid = decodedClaims.uid;
      const point = await this.userService.checkCurrentPoint(uid);
      res.status(200).json(new SuccessResponseData("成功確認點數", point));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }
}

export { UserController };

/* eslint-disable */
import { Request, Response } from "express";
import UserService from "../services/User.service";
import { logger } from "firebase-functions/v1";
import { SuccessResponseData } from "../dtos/Response.dto";
import { UserNotFoundError } from "../errors/User.error";


class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  checkUserPoint = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const uid = decodedClaims.uid;
      const point = await this.userService.checkCurrentPoint(uid);
      res.status(200).json(new SuccessResponseData("成功確認點數", point));
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ sucees: false, error: error.message });
      } else if (error instanceof Error) {
        res.status(500).json({ sucees: false, error: error.message });
      }
      logger.error(error);
    }
  }
}

export { UserController };

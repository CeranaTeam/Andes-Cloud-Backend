
import {Request, Response} from "express";
import UserService from "../services/User.service";
import {logger} from "firebase-functions/v1";
import {SuccessPOSTResponseData, SuccessResponseData} from "../dtos/Response.dto";
import {UserRegisterDTO} from "../dtos/User.dto";
import {errorStatusMap} from "../errors";


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
      res.status(200).json(new SuccessPOSTResponseData("成功註冊"));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      logger.error(error);
    }
  };

  checkUserPoint = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const uid = decodedClaims.uid;
      const point = await this.userService.checkCurrentPoint(uid);
      res.status(200).json(new SuccessResponseData("成功確認點數", point));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      logger.error(error);
    }
  };

  increasePointByThrowing = async (req: Request, res: Response) => {
    try {
      const trashCanId = req.params.trashCanId;
      const decodedClaims = req.body.decodedClaims;
      const uid = decodedClaims.uid;
      await this.userService.increasePointByThrowing(trashCanId, uid);
      res.status(200).json(new SuccessPOSTResponseData("成功增加點數"));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      logger.error(error);
    }
  };

  getImageList = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const uid = decodedClaims.uid;
      const images = await this.userService.getImageList(uid);
      res.status(200).json(new SuccessResponseData("成功取得圖片列表", images));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      logger.error(error);
    }
  };

  labelImage = async (req: Request, res: Response) => {
    const decodedClaims = req.body.decodedClaims;
    const uid = decodedClaims.uid;
    const imageId = req.params.imageId;
    const label = req.body.label;
    try {
      await this.userService.labelImage(uid, imageId, label);
      res.status(200).json(new SuccessPOSTResponseData("成功標記圖片"));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      logger.error(error);
    }
  };
}

export {UserController};

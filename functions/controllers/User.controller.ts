import {Request, Response} from "express";
import UserService from "../services/User.service";
import {
  SuccessPOSTResponseData,
  SuccessResponseData,
} from "../dtos/Response.dto";
import {errorStatusMap} from "../errors";
import {AuthService} from "../interfaces/AuthService";

class UserController {
  private userService: UserService;
  private authService: AuthService;

  constructor(userService: UserService, authService: AuthService) {
    this.userService = userService;
    this.authService = authService;
  }

  generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      },
    );
  };

  register = async (req: Request, res: Response) => {
    try {
      const uid = this.generateUUID();
      const userRegisterDTO = {
        uid: uid,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      if (!userRegisterDTO.name) {
        throw new Error("please provide name");
      }
      if (!userRegisterDTO.email) {
        throw new Error("please provide email");
      }
      if (!userRegisterDTO.password) {
        throw new Error("please provide password");
      }
      await this.userService.register(userRegisterDTO);
      const token = await this.authService.createToken({
        uid: userRegisterDTO.uid,
      }, "10000h");
      res.status(200).json(
        new SuccessResponseData("成功註冊", {token: token}),
      );
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      console.log(error);
    }
  };

  signIn = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const token = await this.authService.createToken({
        uid: decodedClaims.uid,
      }, "1000h");
      res.status(200).json(
        new SuccessResponseData("成功登入", {token: token}),
      );
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  };
}

export {UserController};


import {Request, Response} from "express";
import AdminService from "../services/Admin.service";
import {SuccessPOSTResponseData, SuccessResponseData} from "../dtos/Response.dto";
import {AddTrashCanDTO, AdminRegisterDTO} from "../dtos/Admin.dto";
import {errorStatusMap} from "../errors";
import {AuthService} from "../interfaces/AuthService";


class AdminController {
  private adminService: AdminService;
  private authService: AuthService;

  constructor(adminService: AdminService, authService: AuthService) {
    this.adminService = adminService;
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
      const adminRegisterDTO: AdminRegisterDTO = {
        uid: uid,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      if (!adminRegisterDTO.name) {
        throw new Error("please provide name");
      }
      if (!adminRegisterDTO.email) {
        throw new Error("please provide email");
      }
      if (!adminRegisterDTO.password) {
        throw new Error("please provide password");
      }
      const token = await this.authService.createToken({
        uid: adminRegisterDTO.uid,
      }, "10000h");
      await this.adminService.register(adminRegisterDTO);
      res.status(200).json(new SuccessResponseData("成功註冊", {token: token}));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      console.log(error);
    }
  };

  addTrashCan = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const adminId = decodedClaims.uid;
      const addTrashCanDTO: AddTrashCanDTO = req.body;
      // todo: if any col is undefined, throw error
      addTrashCanDTO.base64Image = addTrashCanDTO.base64Image.replace(/^data:image\/\w+;base64,/, "");

      await this.adminService.addTrashCan(addTrashCanDTO, adminId);
      res.status(200).json(new SuccessPOSTResponseData("成功新增垃圾桶"));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      console.log(error);
    }
  };

  getTrashCanList = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const adminId = decodedClaims.uid;
      const trashCanList = await this.adminService.getTrashCanList(adminId);
      res.status(200).json(new SuccessResponseData("成功取得垃圾桶列表", trashCanList));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      console.log(error);
    }
  };

  getImageInfoList = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const adminId = decodedClaims.uid;
      const trashCanId = req.params.trashCanId;
      const imageInfoList = await this.adminService.getImageInfoList(trashCanId, adminId);
      res.status(200).json(new SuccessResponseData("成功取得圖片列表", imageInfoList));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      console.log(error);
    }
  };
}

export {AdminController};

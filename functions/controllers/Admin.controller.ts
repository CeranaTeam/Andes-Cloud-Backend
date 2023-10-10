/* eslint-disable */
import { Request, Response } from "express";
import AdminService from "../services/Admin.service";
import { logger } from "firebase-functions/v1";
import { SuccessPOSTResponseData, SuccessResponseData } from "../dtos/Response.dto";
import { AddTrashCanDTO, AdminRegisterDTO } from "../dtos/Admin.dto";
import { errorStatusMap } from "../errors";


class AdminController {
  private adminService: AdminService;

  constructor(adminService: AdminService) {
    this.adminService = adminService;
  }

  register = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const adminRegisterDTO: AdminRegisterDTO = decodedClaims;
      await this.adminService.register(adminRegisterDTO);
      res.status(200).json(new SuccessPOSTResponseData("成功註冊"));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }

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
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }

  getTrashCanList = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const adminId = decodedClaims.uid;
      const trashCanList = await this.adminService.getTrashCanList(adminId);
      res.status(200).json(new SuccessResponseData("成功取得垃圾桶列表", trashCanList));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }

  getImageInfoList = async (req: Request, res: Response) => {
    try {
      const decodedClaims = req.body.decodedClaims;
      const adminId = decodedClaims.uid;
      const trashCanId = req.params.trashCanId;
      const imageInfoList = await this.adminService.getImageInfoList(trashCanId, adminId);
      res.status(200).json(new SuccessResponseData("成功取得圖片列表", imageInfoList));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }
}

export { AdminController };

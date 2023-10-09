/* eslint-disable */
import { Request, Response } from "express";
import AdminService from "../services/Admin.service";
import { logger } from "firebase-functions/v1";
import { SuccessPOSTResponseData } from "../dtos/Response.dto";
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
}

export { AdminController };

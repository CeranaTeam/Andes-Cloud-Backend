/* eslint-disable */
import { Request, Response } from "express";
import AdminService from "../services/Admin.service";
import { logger } from "firebase-functions/v1";
import { SuccessResponseData } from "../dtos/Response.dto";
import { AdminRegisterDTO } from "../dtos/Admin.dto";
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
      const adminId = await this.adminService.register(adminRegisterDTO);
      res.status(200).json(new SuccessResponseData("成功註冊", adminId));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({ success: false, error: error.message });
      logger.error(error);
    }
  }


}

export { AdminController };

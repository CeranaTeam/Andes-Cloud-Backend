
import {Request, Response} from "express";
import TrashCanService from "../services/TrashCan.service";
import {logger} from "firebase-functions/v1";
import {SuccessPOSTResponseData} from "../dtos/Response.dto";
import {errorStatusMap} from "../errors";
import {DetectResultDTO} from "../dtos/TrashCan.dto";


class TrashCanController {
  private trashCanService: TrashCanService;

  constructor(trashCanService: TrashCanService) {
    this.trashCanService = trashCanService;
  }

  detectImage = async (req: Request, res: Response) => {
    try {
      const trashCanId = req.params.trashCanId;
      const detectResultDTO: DetectResultDTO = req.body;
      detectResultDTO.base64Image = detectResultDTO.base64Image.replace(/^data:image\/\w+;base64,/, "");
      await this.trashCanService.detectImage(detectResultDTO, trashCanId);
      res.status(200).json(new SuccessPOSTResponseData("成功上傳圖片"));
    } catch (error: any) {
      const status = errorStatusMap[error.constructor.name] || 500;
      res.status(status).json({success: false, error: error.message});
      logger.error(error);
    }
  };
}

export {TrashCanController};

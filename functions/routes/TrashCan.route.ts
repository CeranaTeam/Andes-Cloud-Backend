import {Router as expressRouter} from "express";
import {TrashCanController} from "../controllers/TrashCan.controller";
import TrashCanService from "../services/TrashCan.service";
import {LocalStorageDAO} from "../daos/Storage.local.dao";
import {MongoImageDAO} from "../daos/Image.mongo.dao";
import {MongoTrashCanDAO} from "../daos/TrashCan.mongo.dao";
const router = expressRouter();

// ------- dependency injection -------
const trashCanDAO = new MongoTrashCanDAO();
const storageDAO = new LocalStorageDAO();
const imageDAO = new MongoImageDAO();
const trashCanService = new TrashCanService(trashCanDAO, storageDAO, imageDAO);
const trashCanController = new TrashCanController(trashCanService);
// ------- dependency injection -------

router.post("/:trashCanId/detect", trashCanController.detectImage);
export default router;

import {Router as expressRouter} from "express";
import {TrashCanController} from "../controllers/TrashCan.controller";
import TrashCanService from "../services/TrashCan.service";
import {FirebaseTrashCanDAO} from "../daos/TrashCan.dao";
import {FirebaseStorageDAO} from "../daos/Storage.dao";
import {FirebaseImageDAO} from "../daos/Image.dao";
const router = expressRouter();

// ------- dependency injection -------
const trashCanDAO = new FirebaseTrashCanDAO();
const storageDAO = new FirebaseStorageDAO();
const imageDAO = new FirebaseImageDAO();
const trashCanService = new TrashCanService(trashCanDAO, storageDAO, imageDAO);
const trashCanController = new TrashCanController(trashCanService);
// ------- dependency injection -------

router.post("/:trashCanId/detect", trashCanController.detectImage);
export default router;

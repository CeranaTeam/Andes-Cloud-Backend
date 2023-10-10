import {Router as expressRouter} from "express";
import {AdminController} from "../controllers/Admin.controller";
import AdminService from "../services/Admin.service";
import {FirebaseAdminDAO} from "../daos/Admin.dao";
import {FirebaseTrashCanDAO} from "../daos/TrashCan.dao";
import {FirebaseStorageDAO} from "../daos/Storage.dao";
import {FirebaseImageDAO} from "../daos/Image.dao";
const router = expressRouter();

// ------- dependency injection -------
const adminDAO = new FirebaseAdminDAO();
const trashCanDAO = new FirebaseTrashCanDAO();
const storageDAO = new FirebaseStorageDAO();
const imageDAO = new FirebaseImageDAO();
const adminService = new AdminService(adminDAO, trashCanDAO, storageDAO, imageDAO);
const adminController = new AdminController(adminService);
// ------- dependency injection -------

router.post("/register", adminController.register);
router.post("/trash_can", adminController.addTrashCan);
router.get("/trash_can/list", adminController.getTrashCanList);
router.get("/trash_can/:trashCanId/image/list", adminController.getImageInfoList);
export default router;

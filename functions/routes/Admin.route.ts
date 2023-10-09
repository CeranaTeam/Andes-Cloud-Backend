import {Router as expressRouter} from "express";
import {AdminController} from "../controllers/Admin.controller";
import AdminService from "../services/Admin.service";
import {FirebaseAdminDAO} from "../daos/Admin.dao";
import {FirebaseTrashCanDAO} from "../daos/TrashCan.dao";
import {FirebaseStorageDAO} from "../daos/Storage.dao";
const router = expressRouter();

// ------- dependency injection -------
const adminDAO = new FirebaseAdminDAO();
const trashCanDAO = new FirebaseTrashCanDAO();
const storageDAO = new FirebaseStorageDAO();
const adminService = new AdminService(adminDAO, trashCanDAO, storageDAO);
const adminController = new AdminController(adminService);
// ------- dependency injection -------

router.post("/register", adminController.register);
router.post("/trash_can", adminController.addTrashCan);
export default router;

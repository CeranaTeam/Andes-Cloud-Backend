import {Router as expressRouter} from "express";
import {AdminController} from "../controllers/Admin.controller";
import AdminService from "../services/Admin.service";
import {MongoImageDAO} from "../daos/Image.mongo.dao";
import {LocalStorageDAO} from "../daos/Storage.local.dao";
import {MongoTrashCanDAO} from "../daos/TrashCan.mongo.dao";
import {MongoAdminDAO} from "../daos/Admin.mongo.dao";
import {LocalAuthService} from "../services/LocalAuth.service";
import {AuthFilter} from "../middleware/Validator";
const router = expressRouter();

// ------- dependency injection -------
const adminDAO = new MongoAdminDAO();
const trashCanDAO = new MongoTrashCanDAO();
const storageDAO = new LocalStorageDAO();
const imageDAO = new MongoImageDAO();
const authService = new LocalAuthService();
const adminService = new AdminService(adminDAO, trashCanDAO, storageDAO, imageDAO);
const adminController = new AdminController(adminService, authService);
// ------- dependency injection -------

router.post("/register", adminController.register);
router.post("/signin", adminController.signIn);
router.post("/trash_can", AuthFilter, adminController.addTrashCan);
router.get("/trash_can/list", AuthFilter, adminController.getTrashCanList);
router.get("/trash_can/:trashCanId/image/list", AuthFilter, adminController.getImageInfoList);
export default router;

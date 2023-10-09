import {Router as expressRouter} from "express";
import {UserController} from "../controllers/User.controller";
import UserService from "../services/User.service";
import {FirebaseUserDAO} from "../daos/User.dao";
import {FirebaseImageDAO} from "../daos/Image.dao";
const router = expressRouter();

// ------- dependency injection -------
const userDAO = new FirebaseUserDAO();
const imageDAO = new FirebaseImageDAO();
const userService = new UserService(userDAO, imageDAO);
const userController = new UserController(userService);
// ------- dependency injection -------

router.get("/point", userController.checkUserPoint);
router.post("/register", userController.register);
router.post("/image/:imageId/label", userController.labelImage);
router.get("/image/list", userController.getImageList);
router.post("/point/throwing/trash_can/:trashCanId", userController.increasePointByThrowing);
// router.get("/user/point/labelling/trash_can/:trash_can_id", UserController.getStaffStat);

export default router;

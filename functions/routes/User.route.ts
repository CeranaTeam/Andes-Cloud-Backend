import {Router as expressRouter} from "express";
import {UserController} from "../controllers/User.controller";
import UserService from "../services/User.service";
import {FirebaseUserDAO} from "../daos/User.dao";
const router = expressRouter();

// ------- dependency injection -------
const userDAO = new FirebaseUserDAO();
const userService = new UserService(userDAO);
const userController = new UserController(userService);
// ------- dependency injection -------

router.get("/point", userController.checkUserPoint);
router.post("/register", userController.register);
// router.get("/image/:image_id/label", UserController.getProductTypeStat);
// router.get("/user/point/throwing/trash_can/:trash_can_id", UserController.getStaffStat);
// router.get("/user/point/labelling/trash_can/:trash_can_id", UserController.getStaffStat);
// router.get("/user/image/list", UserController.getLineChart);

export default router;

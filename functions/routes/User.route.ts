import {Router as expressRouter} from "express";
import {UserController} from "../controllers/User.controller";
import UserService from "../services/User.service";
import {LocalAuthService} from "../services/LocalAuth.service";
import {AuthFilter} from "../middleware/Validator";
import {MongoUserDAO} from "../daos/User.mongo.dao";
import {MongoImageDAO} from "../daos/Image.mongo.dao";
import {MongoTrashCanDAO} from "../daos/TrashCan.mongo.dao";
const router = expressRouter();

// ------- dependency injection -------
const userDAO = new MongoUserDAO();
const imageDAO = new MongoImageDAO();
const trashCanDAO = new MongoTrashCanDAO();
const authService = new LocalAuthService();
const userService = new UserService(userDAO, imageDAO, trashCanDAO);
const userController = new UserController(userService, authService);
// ------- dependency injection -------

router.get("/point", AuthFilter, userController.checkUserPoint);
router.post("/register", userController.register);
router.post("/signin", userController.signIn);
router.post("/image/:imageId/label", AuthFilter, userController.labelImage);
router.get("/image/list", AuthFilter, userController.getImageList);
router.post(
  "/point/throwing/trash_can/:trashCanId",
  AuthFilter,
  userController.increasePointByThrowing,
);
router.get("/image/:imageId/label", AuthFilter, userController.labelImage);

export default router;

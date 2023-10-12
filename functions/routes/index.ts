import {Router as expressRouter} from "express";
import UserRoute from "./User.route";
import AdminRoute from "./Admin.route";
import TrashCanRoute from "./TrashCan.route";
import {AuthFilter} from "../middleware/Validator";

const router = expressRouter();
router.use("/user", AuthFilter, UserRoute);
router.use("/admin", AuthFilter, AdminRoute);
router.use("/trash_can", TrashCanRoute);

export default router;

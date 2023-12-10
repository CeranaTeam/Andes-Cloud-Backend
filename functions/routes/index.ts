import {Router as expressRouter} from "express";
import UserRoute from "./User.route";
import AdminRoute from "./Admin.route";
import TrashCanRoute from "./TrashCan.route";

const router = expressRouter();
router.use("/user", UserRoute);
router.use("/admin", AdminRoute);
router.use("/trash_can", TrashCanRoute);

export default router;

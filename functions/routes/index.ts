import {Router as expressRouter} from "express";
import UserRoute from "./User.route";
import {AuthFilter} from "../middleware/Validator";

const router = expressRouter();
router.use("/user", AuthFilter, UserRoute);

export default router;

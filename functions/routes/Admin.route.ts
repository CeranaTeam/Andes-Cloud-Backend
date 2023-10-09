import {Router as expressRouter} from "express";
import {AdminController} from "../controllers/Admin.controller";
import AdminService from "../services/Admin.service";
import {FirebaseAdminDAO} from "../daos/Admin.dao";
const router = expressRouter();

// ------- dependency injection -------
const adminDAO = new FirebaseAdminDAO();
const adminService = new AdminService(adminDAO);
const adminController = new AdminController(adminService);
// ------- dependency injection -------

router.post("/register", adminController.register);
// router.get("/image/:image_id/label", AdminController.getProductTypeStat);
// router.get("/admin/point/throwing/trash_can/:trash_can_id", AdminController.getStaffStat);
// router.get("/admin/point/labelling/trash_can/:trash_can_id", AdminController.getStaffStat);
// router.get("/admin/image/list", AdminController.getLineChart);

export default router;

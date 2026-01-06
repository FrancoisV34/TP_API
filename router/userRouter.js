import { Router } from "express";
import * as userController from "../controller/userController.js";
import { authRequired, requireRole } from "../middleware/auth.js";

const router = Router();

// Admin only
router.get("/", authRequired, requireRole("admin"), userController.list);
router.patch("/:id/role", authRequired, requireRole("admin"), userController.updateRole);

export default router;

import { Router } from "express";
import auth, { userRole } from "../../middleware/auth";
import { commentControllers } from "./comments.controllers";

const router = Router();

router.get("/", commentControllers.getAllComments);
router.post(
  "/",
  auth(userRole.ADMIN, userRole.USER),
  commentControllers.createComment
);

export const commentRoutes = router;

import { Router } from "express";
import { postsControllers } from "./posts.controllers";
import auth, { userRole } from "../../middleware/auth";

const router = Router();

router.get("/", postsControllers.getAllPosts);

router.get(
  "/my-Posts",
  auth(userRole.ADMIN, userRole.USER),
  postsControllers.getMyPost
);

router.get("/:id", postsControllers.getPostById);

router.post(
  "/",
  auth(userRole.ADMIN, userRole.USER),
  postsControllers.createPost
);

router.patch(
  "/:id",
  auth(userRole.ADMIN, userRole.USER),
  postsControllers.updatePost
);

export const postsRoutes = router;

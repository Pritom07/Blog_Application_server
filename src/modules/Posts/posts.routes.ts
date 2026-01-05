import { Router } from "express";
import { postsControllers } from "./posts.controllers";
import auth, { userRole } from "../../middleware/auth";

const router = Router();

router.get("/", postsControllers.getAllPosts);
router.get("/:id", postsControllers.getPostById);
router.post("/", auth(userRole.USER), postsControllers.createPost);

export const postsRoutes = router;

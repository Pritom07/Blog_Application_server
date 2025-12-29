import { Router } from "express";
import { postsControllers } from "./posts.controllers";

const router = Router();

router.post("/", postsControllers.createPost);

export const postsRoutes = router;

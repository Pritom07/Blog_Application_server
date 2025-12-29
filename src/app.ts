import express from "express";
import { postsRoutes } from "./modules/Posts/posts.routes";

const app = express();

app.use(express.json());

app.use("/post", postsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Prisma Blog_Application");
});

export default app;

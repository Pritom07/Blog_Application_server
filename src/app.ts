import express from "express";
import { postsRoutes } from "./modules/Posts/posts.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";

const app = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
  })
);

app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Prisma Blog_Application");
});

export default app;

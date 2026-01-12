import express, { Request, Response } from "express";
import { postsRoutes } from "./modules/Posts/posts.routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from "cors";
import { config } from "./config";
import { commentRoutes } from "./modules/Comments/comments.routes";
import errorHandler from "./middleware/globalErrorHandler";
import notFound from "./middleware/notfound";

const app = express();

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());
app.use(
  cors({
    origin: config.APP_URL,
    credentials: true,
  })
);

app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Prisma Blog_Application");
});

app.use(notFound);
app.use(errorHandler);

export default app;

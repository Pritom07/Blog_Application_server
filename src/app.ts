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

const allowedOrigins = [
  config.APP_URL || "http://localhost:3000",
  config.PROD_APP_URL, // Production frontend URL
  "http://localhost:3000",
  "http://localhost:5000",
].filter(Boolean); // Remove undefined values

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      // Check if origin is in allowedOrigins or matches Vercel preview pattern
      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/Blog_Application_client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/posts", postsRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Prisma Blog_Application");
});

app.use(notFound);
app.use(errorHandler);

export default app;

import { Request, Response } from "express";
import { postsServices } from "./posts.services";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postsServices.createPost(req.body);
    res.status(201).json({
      success: true,
      message: result,
    });
  } catch (err: any) {
    res.status(200).json({
      success: false,
      message: err.message,
    });
  }
};

export const postsControllers = { createPost };

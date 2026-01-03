import { Request, Response } from "express";
import { postsServices } from "./posts.services";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const result = await postsServices.createPost(req.body, user?.id as string);
    res.status(201).json({
      success: true,
      message: "Post created succcessfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const search = req.query.search;
    const searchVal = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];

    const result = await postsServices.getAllPosts({ searchVal, tags });
    res.status(200).json({
      success: true,
      message: "Getting posts successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

export const postsControllers = { createPost, getAllPosts };

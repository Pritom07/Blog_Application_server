import { Request, Response } from "express";
import { postsServices } from "./posts.services";
import { postStatus } from "../../../generated/prisma/enums";

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

    const isFeaturedQyery = req.query.isFeatured;
    let isFeatured: boolean | undefined;
    if (typeof isFeaturedQyery === "string") {
      if (isFeaturedQyery === "true") {
        isFeatured = true;
      } else if (isFeaturedQyery === "false") {
        isFeatured = false;
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid value for isFeatured",
        });
      }
    }

    const status = req.query.status as postStatus;

    const author_Id = req.query.author_Id as string;

    const result = await postsServices.getAllPosts({
      searchVal,
      tags,
      isFeatured,
      status,
      author_Id,
    });
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

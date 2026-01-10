import { Request, Response } from "express";
import { postsServices } from "./posts.services";
import { postStatus } from "../../../generated/prisma/enums";
import pagination_sorting_Helper from "../../helpers/pagination&sortingHelper";
import { userRole } from "../../middleware/auth";

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

    const { page, limit, skip, sortby, sortorder } = pagination_sorting_Helper(
      req.query
    );

    const Result = await postsServices.getAllPosts({
      searchVal,
      tags,
      isFeatured,
      status,
      author_Id,
      page,
      limit,
      skip,
      sortby,
      sortorder,
    });
    const { result, ...remaings } = Result;
    res.status(200).json({
      success: true,
      message: "Getting posts successfully",
      data: result,
      metaData: remaings,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      throw new Error("Post Id not used");
    }

    const result = await postsServices.getPostById(postId);
    res.status(200).json({
      success: true,
      message: "Post getting successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

const getMyPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user || user.status !== "ACTIVE") {
      throw new Error("User not found");
    }

    const { sortby, sortorder } = pagination_sorting_Helper(req.query);

    const { result, postCount } = await postsServices.getMyPost(
      user.id,
      sortby,
      sortorder
    );
    res.status(200).json({
      success: true,
      message: "Getting posts successfully",
      data: result,
      totalPosts: postCount,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User not found");
    }

    const isAdmin: boolean = user.role === userRole.ADMIN;
    const result = await postsServices.updatePost(
      req.params.id as string,
      req.body,
      user.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

export const postsControllers = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPost,
  updatePost,
};

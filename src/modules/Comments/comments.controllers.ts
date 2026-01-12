import { NextFunction, Request, Response } from "express";
import { commentServices } from "./comments.services";
import { userRole } from "../../middleware/auth";

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author_Id = req.user?.id;
    req.body["author_Id"] = author_Id;
    const result = await commentServices.createComment(req.body);
    res.status(201).json({
      success: true,
      message: "Comment creation successful",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await commentServices.getAllComments();
    res.status(200).json({
      success: true,
      message: "Getting all comments successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getCommentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await commentServices.getCommentById(
      req.params.id as string
    );
    res.status(200).json({
      success: true,
      message: "Getting comment successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getCommentByAuthorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await commentServices.getCommentByAuthorId(
      req.params.id as string
    );
    res.status(200).json({
      success: true,
      message: "Getting comment successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User not found");
    }

    const isAdmin: boolean = user.role === userRole.ADMIN;
    const result = await commentServices.deleteComment(
      req.params.id as string,
      user.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User not found");
    }

    const isAdmin: boolean = user.role === userRole.ADMIN;
    const result = await commentServices.updateComment(
      req.params.id as string,
      req.body,
      user?.id,
      isAdmin
    );
    res.status(200).json({
      success: true,
      message: "Comment updation successful",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const commentControllers = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment,
};

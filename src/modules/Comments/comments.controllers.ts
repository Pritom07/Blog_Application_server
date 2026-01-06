import { Request, Response } from "express";
import { commentServices } from "./comments.services";

const createComment = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

const getAllComments = async (req: Request, res: Response) => {
  try {
    const result = await commentServices.getAllComments();
    res.status(200).json({
      success: true,
      message: "Getting all comments successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: `Error Occured : ${err.message}`,
    });
  }
};

export const commentControllers = { createComment, getAllComments };

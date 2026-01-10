import { commentSatus } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createComment = async (payLoad: {
  content: string;
  post_Id: string;
  parent_Id?: string;
  author_Id: string;
}) => {
  const result = await prisma.comments.create({
    data: payLoad,
  });
  return result;
};

const getAllComments = async () => {
  const result = await prisma.comments.findMany({
    orderBy: {
      created_At: "asc",
    },
  });
  return result;
};

const getCommentById = async (id: string) => {
  const result = await prisma.comments.findUnique({
    where: {
      id,
    },

    include: {
      post: {
        select: {
          title: true,
          content: true,
          views: true,
        },
      },
    },
  });
  return result;
};

const getCommentByAuthorId = async (author_Id: string) => {
  const result = await prisma.comments.findMany({
    where: {
      author_Id,
    },

    orderBy: {
      created_At: "asc",
    },

    include: {
      post: {
        select: {
          title: true,
          content: true,
          views: true,
        },
      },
    },
  });
  return result;
};

const deleteComment = async (
  id: string,
  author_Id: string,
  isAdmin: boolean
) => {
  const isExist = await prisma.comments.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      author_Id: true,
    },
  });

  if (!isAdmin && author_Id !== isExist.author_Id) {
    throw new Error("You are not allowed to perform this action");
  }

  const result = await prisma.comments.delete({
    where: {
      id,
    },
  });
  return result;
};

const updateComment = async (
  id: string,
  payLoad: { content?: string; status?: commentSatus },
  author_Id: string,
  isAdmin: boolean
) => {
  const isExist = await prisma.comments.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      author_Id: true,
      status: true,
    },
  });

  const updateData = { ...payLoad };

  if (!isAdmin) {
    if (author_Id !== isExist.author_Id) {
      throw new Error("You are not allowed to perform this action");
    }

    if (updateData.status && updateData.status === isExist.status) {
      delete updateData.status;

      if (Object.keys(updateData).length === 0) {
        throw new Error(`status : ${isExist.status} already exists.`);
      }
    }
  }

  if (isAdmin) {
    delete updateData.content;

    if (updateData.status && updateData?.status === isExist.status) {
      delete updateData.status;

      if (Object.keys(updateData).length === 0) {
        throw new Error(`status : ${isExist.status} already exists.`);
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error(
        "No valid fields provided for update.You can only update the post status."
      );
    }
  }

  const result = await prisma.comments.update({
    where: {
      id,
    },
    data: updateData,
  });
  return result;
};

export const commentServices = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
  updateComment,
};

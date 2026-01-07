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

const deleteComment = async (id: string) => {
  const result = await prisma.comments.delete({
    where: {
      id,
    },
  });
  return result;
};

export const commentServices = {
  createComment,
  getAllComments,
  getCommentById,
  getCommentByAuthorId,
  deleteComment,
};

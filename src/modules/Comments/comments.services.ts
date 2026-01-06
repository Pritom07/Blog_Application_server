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

export const commentServices = { createComment, getAllComments };

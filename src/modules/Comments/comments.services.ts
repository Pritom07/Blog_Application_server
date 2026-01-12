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
  const isExist = await prisma.comments.findFirst();

  if (!isExist) {
    throw new Error("NO_COMMENT_EXIST_YET");
  }

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

  if (!result) {
    throw new Error("COMMENT_NOT_FOUND");
  }

  return result;
};

const getCommentByAuthorId = async (author_Id: string) => {
  const isExist = await prisma.comments.findFirst({
    where: {
      author_Id,
    },
  });

  if (!isExist) {
    throw new Error("NO_COMMENT_CREATED_BY_THE_AUTHOR / INVALID_AUTHOR_ID");
  }

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
  const isExist = await prisma.comments.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      author_Id: true,
    },
  });

  if (!isExist) {
    throw new Error("NO_SUCH_COMMENT_EXIST_TO_DELETE");
  }

  if (!isAdmin && author_Id !== isExist.author_Id) {
    throw new Error("YOU_ARE_NOT_ALLOWED_TO_PERFORM_THIS_ACTION");
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
  const isExist = await prisma.comments.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      author_Id: true,
      status: true,
    },
  });

  if (!isExist) {
    throw new Error("NO_SUCH_COMMANT_EXIST_TO_UPDATE");
  }

  const updateData = { ...payLoad };

  if (!isAdmin) {
    if (author_Id !== isExist.author_Id) {
      throw new Error("YOU_ARE_NOT_ALLOWED_TO_PERFORM_THIS_ACTION");
    }

    if (updateData.status && updateData.status === isExist.status) {
      delete updateData.status;

      if (Object.keys(updateData).length === 0) {
        throw new Error(`STATUS : ${isExist.status} ALREADY EXIST.`);
      }
    }
  }

  if (isAdmin) {
    delete updateData.content;

    if (updateData.status && updateData?.status === isExist.status) {
      delete updateData.status;

      if (Object.keys(updateData).length === 0) {
        throw new Error(`STATUS : ${isExist.status} ALREADY EXIST.`);
      }
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error(
        "NO_VALID_FIELD_PROVIDED_FOR_UPDATE.YOU_CAN_ONLY_UPDATE_POST_STATUS."
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

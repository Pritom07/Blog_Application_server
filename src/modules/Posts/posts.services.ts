import { Posts } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createPost = async (
  payLoad: Omit<Posts, "id" | "thumbnail" | "isFeatured" | "status" | "views">
) => {
  const result = await prisma.posts.create({ data: payLoad });
  return result;
};

export const postsServices = { createPost };

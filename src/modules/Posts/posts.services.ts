import { Posts } from "../../../generated/prisma/client";
import { PostsWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createPost = async (
  payLoad: Omit<Posts, "id" | "created_At" | "updated_At" | "author_Id">,
  author_Id: string
) => {
  const result = await prisma.posts.create({ data: { ...payLoad, author_Id } });
  return result;
};

const getAllPosts = async ({
  searchVal,
  tags,
  isFeatured,
}: {
  searchVal: string | undefined;
  tags: Array<string> | [];
  isFeatured: boolean | undefined;
}) => {
  const andConditions: PostsWhereInput[] = [];

  if (searchVal) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: searchVal,
            mode: "insensitive",
          },
        },
        {
          content: {
            contains: searchVal,
            mode: "insensitive",
          },
        },
        {
          tags: {
            has: searchVal,
          },
        },
      ],
    });
  }

  if (tags.length) {
    andConditions.push({
      tags: {
        hasEvery: tags,
      },
    });
  }

  if (typeof isFeatured === "boolean") {
    andConditions.push({
      isFeatured,
    });
  }

  const result = await prisma.posts.findMany({
    where: {
      AND: andConditions,
    },
  });
  return result;
};

export const postsServices = { createPost, getAllPosts };

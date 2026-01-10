import {
  commentSatus,
  Posts,
  postStatus,
} from "../../../generated/prisma/client";
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
  status,
  author_Id,
  page,
  limit,
  skip,
  sortby,
  sortorder,
}: {
  searchVal: string | undefined;
  tags: Array<string> | [];
  isFeatured: boolean | undefined;
  status: postStatus;
  author_Id: string;
  page: number;
  limit: number;
  skip: number;
  sortby: string;
  sortorder: string;
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

  if (status) {
    andConditions.push({
      status,
    });
  }

  if (author_Id) {
    andConditions.push({
      author_Id,
    });
  }

  const result = await prisma.posts.findMany({
    skip,
    take: limit,
    where: {
      AND: andConditions,
    },
    orderBy: {
      [sortby]: sortorder,
    },

    include: {
      comments: {
        where: {
          parent_Id: null,
          status: commentSatus.APPROVED,
        },

        orderBy: {
          created_At: "desc",
        },

        include: {
          replies: {
            where: {
              status: commentSatus.APPROVED,
            },

            orderBy: {
              created_At: "asc",
            },

            include: {
              replies: {
                where: {
                  status: commentSatus.APPROVED,
                },

                orderBy: {
                  created_At: "asc",
                },
              },
            },
          },
        },
      },

      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const resultCount = await prisma.posts.count({
    where: {
      AND: andConditions,
    },
  });

  const totalPages = Math.ceil(resultCount / limit);

  return { result, resultCount, page, limit, totalPages };
};

const getPostById = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const post = await tx.posts.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new Error("POST_NOT_FOUND");
    }

    await tx.posts.update({
      where: {
        id,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    });

    const outcome = await tx.posts.findUnique({
      where: {
        id,
      },

      include: {
        comments: {
          where: {
            parent_Id: null,
            status: commentSatus.APPROVED,
          },

          orderBy: {
            created_At: "desc",
          },

          include: {
            replies: {
              where: {
                status: commentSatus.APPROVED,
              },

              orderBy: {
                created_At: "asc",
              },

              include: {
                replies: {
                  where: {
                    status: commentSatus.APPROVED,
                  },

                  orderBy: {
                    created_At: "asc",
                  },
                },
              },
            },
          },
        },

        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
    return outcome;
  });

  return result;
};

const getMyPost = async (
  author_Id: string,
  sortby: string,
  sortorder: string
) => {
  const post = await prisma.posts.findFirst({
    where: {
      author_Id,
    },
  });

  if (!post) {
    throw new Error("POST_NOT_FOUND");
  }

  const result = await prisma.posts.findMany({
    where: {
      author_Id,
    },

    orderBy: {
      [sortby]: sortorder,
    },

    include: {
      _count: {
        select: {
          comments: true,
        },
      },
    },
  });

  const postCount = await prisma.posts.aggregate({
    where: {
      author_Id,
    },

    _count: {
      id: true,
    },
  });
  return { result, postCount: postCount._count.id };
};

export const postsServices = {
  createPost,
  getAllPosts,
  getPostById,
  getMyPost,
};

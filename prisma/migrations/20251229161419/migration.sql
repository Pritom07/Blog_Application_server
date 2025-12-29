-- CreateEnum
CREATE TYPE "postStatus" AS ENUM ('PUBLISHED', 'DRAFT', 'ARCHIVE');

-- CreateEnum
CREATE TYPE "commentSatus" AS ENUM ('APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "thumbnail" TEXT,
    "isFeatured" BOOLEAN DEFAULT false,
    "status" "postStatus" NOT NULL,
    "tags" TEXT[],
    "views" INTEGER DEFAULT 0,
    "author_Id" TEXT NOT NULL,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "commentSatus" NOT NULL,
    "author_Id" TEXT NOT NULL,
    "post_Id" TEXT NOT NULL,
    "parent_Id" TEXT,
    "created_At" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_At" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "posts_author_Id_idx" ON "posts"("author_Id");

-- CreateIndex
CREATE INDEX "comments_author_Id_idx" ON "comments"("author_Id");

-- CreateIndex
CREATE INDEX "comments_post_Id_idx" ON "comments"("post_Id");

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_Id_fkey" FOREIGN KEY ("parent_Id") REFERENCES "comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

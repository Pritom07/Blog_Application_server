-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_parent_Id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_post_Id_fkey";

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_post_Id_fkey" FOREIGN KEY ("post_Id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_Id_fkey" FOREIGN KEY ("parent_Id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

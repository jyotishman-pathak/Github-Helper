/*
  Warnings:

  - You are about to drop the `Commit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commit" DROP CONSTRAINT "Commit_projectId_fkey";

-- DropTable
DROP TABLE "Commit";

-- CreateTable
CREATE TABLE "AiCommit" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" TEXT NOT NULL,
    "commitAuthorAvatar" TEXT NOT NULL,
    "commitMessage" TEXT NOT NULL,
    "commitHash" TEXT NOT NULL,
    "commitAuthorName" TEXT NOT NULL,
    "commitDate" TIMESTAMP(3) NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "AiCommit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AiCommit" ADD CONSTRAINT "AiCommit_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

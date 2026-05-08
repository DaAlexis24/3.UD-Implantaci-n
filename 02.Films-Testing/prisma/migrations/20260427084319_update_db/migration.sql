/*
  Warnings:

  - You are about to alter the column `name` on the `genres` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(60)`.
  - You are about to drop the column `firstName` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `surName` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profiles` table. All the data in the column will be lost.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `movie_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `_GenreToMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `genres` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `first_name` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `film_id` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `review` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'EDITOR', 'ADMIN');

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_GenreToMovie" DROP CONSTRAINT "_GenreToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- DropForeignKey
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_movie_id_fkey";

-- DropIndex
DROP INDEX "profiles_userId_key";

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(60);

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "firstName",
DROP COLUMN "surName",
DROP COLUMN "userId",
ADD COLUMN     "first_name" VARCHAR(200) NOT NULL,
ADD COLUMN     "surname" VARCHAR(200) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "profile_id" DROP DEFAULT;
DROP SEQUENCE "profiles_profile_id_seq";

-- AlterTable
ALTER TABLE "reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "movie_id",
DROP COLUMN "text",
ADD COLUMN     "film_id" INTEGER NOT NULL,
ADD COLUMN     "rate" DECIMAL(3,1) NOT NULL,
ADD COLUMN     "review" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("user_id", "film_id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(255);

-- DropTable
DROP TABLE "_GenreToMovie";

-- DropTable
DROP TABLE "movies";

-- CreateTable
CREATE TABLE "films" (
    "film_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "release_year" INTEGER NOT NULL,
    "director" VARCHAR(255) NOT NULL,
    "duration" INTEGER NOT NULL,
    "poster" TEXT,
    "rate" DECIMAL(2,1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "films_pkey" PRIMARY KEY ("film_id")
);

-- CreateTable
CREATE TABLE "_films_genres" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_films_genres_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_films_genres_B_index" ON "_films_genres"("B");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_film_id_fkey" FOREIGN KEY ("film_id") REFERENCES "films"("film_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_films_genres" ADD CONSTRAINT "_films_genres_A_fkey" FOREIGN KEY ("A") REFERENCES "films"("film_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_films_genres" ADD CONSTRAINT "_films_genres_B_fkey" FOREIGN KEY ("B") REFERENCES "genres"("genre_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "RobotsDirective" AS ENUM ('INHERIT', 'INDEX_FOLLOW', 'NOINDEX_FOLLOW', 'NOINDEX_NOFOLLOW');

-- CreateEnum
CREATE TYPE "SchemaSource" AS ENUM ('AUTO', 'CUSTOM');

-- AlterTable
ALTER TABLE "SiteSetting" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "faviconUrl" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "footerTrackingCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "googleAnalyticsId" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "headerTrackingCode" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "metaPixelId" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "PageSeo" (
    "id" TEXT NOT NULL,
    "route" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "keywords" TEXT NOT NULL DEFAULT '',
    "canonicalUrl" TEXT NOT NULL DEFAULT '',
    "robots" "RobotsDirective" NOT NULL DEFAULT 'INHERIT',
    "schemaEnabled" BOOLEAN NOT NULL DEFAULT true,
    "schemaSource" "SchemaSource" NOT NULL DEFAULT 'AUTO',
    "customSchema" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSeo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PageSeo_route_key" ON "PageSeo"("route");

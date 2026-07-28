-- CreateEnum
CREATE TYPE "HoursKind" AS ENUM ('FULL', 'SHORT');

-- CreateEnum
CREATE TYPE "FooterLinkGroup" AS ENUM ('QUICK_LINK', 'FOOTER_SERVICE');

-- CreateEnum
CREATE TYPE "SpecialCardVariant" AS ENUM ('TIERS', 'STORY');

-- CreateEnum
CREATE TYPE "SubmissionType" AS ENUM ('BOOKING', 'CLAIM', 'MEMBERSHIP_REQUEST', 'CONTACT');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'CONTACTED', 'CLOSED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSetting" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "phoneHref" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailHref" TEXT NOT NULL,
    "bookingUrl" TEXT NOT NULL,
    "copyrightText" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialLink" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SocialLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "badge" TEXT,
    "addressLines" JSONB NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LocationHours" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "kind" "HoursKind" NOT NULL,
    "days" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "LocationHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FooterNavLink" (
    "id" TEXT NOT NULL,
    "group" "FooterLinkGroup" NOT NULL,
    "label" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "FooterNavLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialCard" (
    "id" TEXT NOT NULL,
    "variant" "SpecialCardVariant" NOT NULL,
    "image" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL,
    "title" TEXT,
    "eyebrow" TEXT,
    "headline" TEXT,
    "description" TEXT,
    "cta" TEXT NOT NULL DEFAULT 'Claim',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "locations" JSONB,

    CONSTRAINT "SpecialCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialCardTier" (
    "id" TEXT NOT NULL,
    "specialCardId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SpecialCardTier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecialsPageSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "heroTitle" TEXT NOT NULL,
    "heroIntro" TEXT NOT NULL,
    "heroImage" TEXT NOT NULL,
    "heroImageAlt" TEXT NOT NULL,
    "offersHeading" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecialsPageSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembershipPromo" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "headingStart" TEXT NOT NULL,
    "headingEmphasis" TEXT NOT NULL,
    "headingEnd" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ctaLabel" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MembershipPromo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembershipPromoBullet" (
    "id" TEXT NOT NULL,
    "promoId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MembershipPromoBullet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL,
    "type" "SubmissionType" NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "location" TEXT,
    "service" TEXT,
    "preferredDate" TEXT,
    "preferredTime" TEXT,
    "notes" TEXT,
    "message" TEXT,
    "offerId" TEXT,
    "offerLabel" TEXT,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "LocationHours" ADD CONSTRAINT "LocationHours_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialCardTier" ADD CONSTRAINT "SpecialCardTier_specialCardId_fkey" FOREIGN KEY ("specialCardId") REFERENCES "SpecialCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembershipPromoBullet" ADD CONSTRAINT "MembershipPromoBullet_promoId_fkey" FOREIGN KEY ("promoId") REFERENCES "MembershipPromo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "SpecialCard"("id") ON DELETE SET NULL ON UPDATE CASCADE;

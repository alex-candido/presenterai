-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "VisibilityType" AS ENUM ('PUBLIC', 'PRIVATE');

-- CreateEnum
CREATE TYPE "ScopeType" AS ENUM ('MULTI_PAGE', 'SINGLE_PAGE');

-- CreateEnum
CREATE TYPE "LanguageType" AS ENUM ('EN', 'ES', 'FR', 'DE', 'IT', 'PT', 'RU', 'ZH', 'JA', 'KO');

-- CreateEnum
CREATE TYPE "AspectRatio" AS ENUM ('RATIO_16_9', 'RATIO_4_3', 'RATIO_9_16', 'RATIO_1_1');

-- CreateEnum
CREATE TYPE "ToneType" AS ENUM ('FORMAL', 'INFORMAL', 'FRIENDLY', 'PROFESSIONAL', 'HUMOROUS');

-- CreateEnum
CREATE TYPE "AmountType" AS ENUM ('MINIMAL', 'CONCISE', 'DETAILED', 'EXTENSIVE');

-- CreateEnum
CREATE TYPE "AudienceType" AS ENUM ('AUTO', 'GENERAL', 'STUDENTS', 'PROFESSIONALS', 'ENTREPRENEURS', 'MARKETERS', 'DEVELOPERS', 'DESIGNERS', 'EDUCATORS', 'HEALTHCARE_PROVIDERS', 'FINANCIAL_ADVISORS');

-- CreateEnum
CREATE TYPE "ScenarioType" AS ENUM ('AUTO', 'GENERAL', 'BUSINESS_PITCH', 'EDUCATIONAL_LECTURE', 'PRODUCT_DEMO', 'TRAINING_SESSION', 'MARKETING_CAMPAIGN', 'TECHNICAL_PRESENTATION', 'SALES_PITCH', 'CONFERENCE_TALK', 'WORKSHOP', 'WEBINAR');

-- CreateEnum
CREATE TYPE "ThemeType" AS ENUM ('LIGHT', 'DARK', 'CORPORATE', 'CREATIVE', 'MINIMALIST', 'MODERN', 'CLASSIC');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('GENERATED', 'EDITED', 'CREATED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "role" "RoleType" NOT NULL DEFAULT 'MEMBER',
    "status" "StatusType" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "provider" TEXT NOT NULL DEFAULT 'credential',
    "providerAccountId" TEXT,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "password" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verifications" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "visibility" "VisibilityType" NOT NULL DEFAULT 'PRIVATE',
    "status" "StatusType" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generations" (
    "id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "documentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "source" "SourceType" NOT NULL DEFAULT 'GENERATED',
    "scope" "ScopeType" NOT NULL DEFAULT 'MULTI_PAGE',
    "tone" "ToneType" NOT NULL DEFAULT 'PROFESSIONAL',
    "amount" "AmountType" NOT NULL DEFAULT 'CONCISE',
    "audience" "AudienceType" NOT NULL DEFAULT 'AUTO',
    "scenario" "ScenarioType" NOT NULL DEFAULT 'AUTO',
    "theme" "ThemeType" NOT NULL DEFAULT 'LIGHT',
    "language" "LanguageType" NOT NULL DEFAULT 'EN',
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "aspectRatio" TEXT NOT NULL DEFAULT '16_9',
    "keywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "prompt" TEXT NOT NULL,
    "outlines" JSONB NOT NULL,
    "aiMetadata" JSONB,
    "status" "StatusType" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "presentations" (
    "id" TEXT NOT NULL,
    "order" SERIAL NOT NULL,
    "generationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "source" "SourceType" NOT NULL DEFAULT 'GENERATED',
    "slug" TEXT NOT NULL,
    "slides" JSONB NOT NULL,
    "aiMetadata" JSONB,
    "status" "StatusType" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "presentations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "accounts_userId_idx" ON "accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- CreateIndex
CREATE INDEX "verifications_identifier_idx" ON "verifications"("identifier");

-- CreateIndex
CREATE INDEX "documents_userId_idx" ON "documents"("userId");

-- CreateIndex
CREATE INDEX "generations_documentId_idx" ON "generations"("documentId");

-- CreateIndex
CREATE INDEX "generations_userId_idx" ON "generations"("userId");

-- CreateIndex
CREATE INDEX "presentations_generationId_idx" ON "presentations"("generationId");

-- CreateIndex
CREATE INDEX "presentations_userId_idx" ON "presentations"("userId");

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presentations" ADD CONSTRAINT "presentations_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "generations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "presentations" ADD CONSTRAINT "presentations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

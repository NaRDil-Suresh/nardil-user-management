-- Migration: Add Phone Number Field to Production
-- Description: Add user_phnumber column to User table in production database
-- Date: 2025-10-03
-- Database: vcnardil@gmail.com's Project (Production)

-- This migration adds the phone number field that was already added to Test_stage
-- Now applying the same change to production database

-- Add phone number column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "user_phnumber" TEXT;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS "idx_user_phnumber" 
ON "User"("user_phnumber");

-- Add comment
COMMENT ON COLUMN "User"."user_phnumber" IS 'User phone number field added from Test_stage';

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'User' AND column_name = 'user_phnumber';

-- Migration: Add user_addcol Field to Production
-- Description: Add user_addcol column to User table in production database
-- Date: 2025-10-03
-- Database: vcnardil@gmail.com's Project (Production)
-- Source: Test_stage database (already has this column)

-- This migration adds the user_addcol field that was added to Test_stage
-- Now applying the same change to production database

-- Add user_addcol column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "user_addcol" TEXT;

-- Add index for better performance (optional)
CREATE INDEX IF NOT EXISTS "idx_user_addcol" 
ON "User"("user_addcol");

-- Add comment
COMMENT ON COLUMN "User"."user_addcol" IS 'Additional user information field added from Test_stage';

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'User' AND column_name = 'user_addcol';

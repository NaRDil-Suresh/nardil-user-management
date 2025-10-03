-- Migration: Add Phone Number Field
-- Description: Add user_phnumber column to User table
-- Date: 2025-10-03

-- Add phone number column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "user_phnumber" TEXT;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS "idx_user_phnumber" 
ON "User"("user_phnumber");

-- Add comment
COMMENT ON COLUMN "User"."user_phnumber" IS 'User phone number';

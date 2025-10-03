-- Rollback Migration: Remove user_addcol Field from Production
-- Description: Remove user_addcol column from User table in production database
-- Date: 2025-10-03
-- Database: vcnardil@gmail.com's Project (Production)

-- Remove index first
DROP INDEX IF EXISTS "idx_user_addcol";

-- Remove user_addcol column
ALTER TABLE "User" 
DROP COLUMN IF EXISTS "user_addcol";

-- Verify the column was removed
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'User' AND column_name = 'user_addcol';

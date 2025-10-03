-- Rollback Migration: Remove User Roles
-- Description: Remove user roles and permissions system
-- Date: 2025-10-03
-- Author: Development Team

-- Remove foreign key constraint first
ALTER TABLE "User" 
DROP CONSTRAINT IF EXISTS "User_role_id_fkey";

-- Remove role_id column from User table
ALTER TABLE "User" 
DROP COLUMN IF EXISTS "role_id";

-- Remove indexes
DROP INDEX IF EXISTS "idx_user_role_id";
DROP INDEX IF EXISTS "idx_user_roles_name";

-- Drop the UserRoles table
DROP TABLE IF EXISTS "UserRoles";

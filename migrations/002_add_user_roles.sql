-- Migration: Add User Roles
-- Description: Add user roles and permissions system
-- Date: 2025-10-03
-- Author: Development Team

-- Create roles table
CREATE TABLE IF NOT EXISTS "UserRoles" (
    "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    "role_name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "permissions" JSONB,
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add role_id to User table
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "role_id" UUID REFERENCES "UserRoles"("id");

-- Create default roles
INSERT INTO "UserRoles" ("role_name", "description", "permissions") VALUES
('admin', 'Administrator with full access', '{"can_create": true, "can_edit": true, "can_delete": true, "can_view_all": true}'),
('user', 'Regular user with limited access', '{"can_create": true, "can_edit": false, "can_delete": false, "can_view_all": false}'),
('viewer', 'Read-only access', '{"can_create": false, "can_edit": false, "can_delete": false, "can_view_all": true}')
ON CONFLICT ("role_name") DO NOTHING;

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS "idx_user_role_id" ON "User"("role_id");
CREATE INDEX IF NOT EXISTS "idx_user_roles_name" ON "UserRoles"("role_name");

-- Add comments
COMMENT ON TABLE "UserRoles" IS 'User roles and permissions';
COMMENT ON COLUMN "User"."role_id" IS 'User role reference';
COMMENT ON COLUMN "UserRoles"."permissions" IS 'JSON object containing role permissions';

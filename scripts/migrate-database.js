#!/usr/bin/env node

/**
 * Database Migration Script
 * Helps synchronize changes between development and production databases
 */

const fs = require('fs');
const path = require('path');

console.log(`
🔄 DATABASE MIGRATION SYSTEM

This helps you keep development and production databases in sync.

📋 Migration Workflow:
1. Make changes in Development Database
2. Test everything works
3. Create migration script
4. Apply to Production Database
5. Deploy to production

🛠️ Available Commands:
   npm run migrate:create <name>  - Create new migration
   npm run migrate:dev           - Apply to development
   npm run migrate:prod          - Apply to production
   npm run migrate:status        - Check migration status

📁 Migration Files:
   - migrations/001_initial_setup.sql
   - migrations/002_add_phone_number.sql
   - migrations/003_add_user_roles.sql
`);

// Create migrations directory
const migrationsDir = path.join(process.cwd(), 'migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
  console.log('✅ Created migrations directory');
}

// Create sample migration
const sampleMigration = `-- Migration: Add Phone Number Field
-- Description: Add user_phnumber column to User table
-- Date: ${new Date().toISOString().split('T')[0]}

-- Add phone number column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "user_phnumber" TEXT;

-- Add index for better performance
CREATE INDEX IF NOT EXISTS "idx_user_phnumber" 
ON "User"("user_phnumber");

-- Add comment
COMMENT ON COLUMN "User"."user_phnumber" IS 'User phone number';
`;

const sampleMigrationFile = path.join(migrationsDir, '001_add_phone_number.sql');
if (!fs.existsSync(sampleMigrationFile)) {
  fs.writeFileSync(sampleMigrationFile, sampleMigration);
  console.log('✅ Created sample migration: 001_add_phone_number.sql');
}

console.log(`
📖 Migration Best Practices:

1. **Always test in development first**
2. **Create migration scripts for all changes**
3. **Test migrations on development database**
4. **Apply to production during low-traffic periods**
5. **Keep backups before major changes**

🔄 Example Workflow:
1. Add new column in development database
2. Create migration script
3. Test migration on development
4. Apply to production
5. Deploy application

🛡️ Safety Tips:
- Always backup production before migrations
- Test migrations on development first
- Apply migrations during maintenance windows
- Have rollback plan ready
`);

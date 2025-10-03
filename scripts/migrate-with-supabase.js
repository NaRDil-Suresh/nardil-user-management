#!/usr/bin/env node

/**
 * Supabase Migration Script
 * Works with your specific Supabase projects
 */

const fs = require('fs');
const path = require('path');

console.log(`
🔄 SUPABASE MIGRATION SYSTEM

Your Database Setup:
📊 Production: vcnardil@gmail.com's Project (Primary Database)
📊 Development: Test_stage (Dev & Testing Database)

🛠️ Migration Workflow:
1. Make changes in Test_stage database
2. Test your application
3. Create migration script
4. Apply to Production database
5. Deploy application

📋 Available Commands:
   npm run migrate:create <name>  - Create new migration
   npm run migrate:dev           - Apply to Test_stage database
   npm run migrate:prod          - Apply to Production database
   npm run migrate:status        - Check migration status

🔧 Environment Configuration:
   - Development: Uses Test_stage database
   - Production: Uses vcnardil@gmail.com's Project database
`);

// Create migrations directory if it doesn't exist
const migrationsDir = path.join(process.cwd(), 'migrations');
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
  console.log('✅ Created migrations directory');
}

// Check if migration files exist
const migrationFiles = fs.readdirSync(migrationsDir).filter(file => file.endsWith('.sql') && !file.includes('rollback'));
console.log(`📁 Found ${migrationFiles.length} migration files`);

if (migrationFiles.length > 0) {
  console.log('\n📋 Available Migrations:');
  migrationFiles.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
}

console.log(`
🔄 Migration Best Practices:

1. **Always test in Test_stage first**
2. **Create migration scripts for all changes**
3. **Test migrations on Test_stage database**
4. **Apply to Production during low-traffic periods**
5. **Keep backups before major changes**

🛡️ Safety Tips:
- Always backup Production database before migrations
- Test migrations on Test_stage first
- Apply migrations during maintenance windows
- Have rollback plan ready

📖 Example Workflow:
1. Add new column in Test_stage database
2. Create migration script
3. Test migration on Test_stage
4. Apply to Production database
5. Deploy application
`);

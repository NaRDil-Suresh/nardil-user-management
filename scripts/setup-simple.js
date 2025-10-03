#!/usr/bin/env node

/**
 * Simple Database Setup Script
 * Sets up one database for all environments
 */

const fs = require('fs');
const path = require('path');

// Your existing production database credentials
const PRODUCTION_DB = {
  url: 'https://jgwgluakhmgzemdsqjwc.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2dsdWFraG1nemVtZHNxandjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODQ3NDgsImV4cCI6MjA3NTA2MDc0OH0.GvBHIJtD-PM6Jpm1A3ujMBgn3QfxkvRGUYyn7IBDoV4'
};

const environments = ['.env.local', '.env.staging', '.env.production'];

function createSimpleEnvironment(fileName, env) {
  const content = `# ${env} Environment
# Using production database for all environments

REACT_APP_SUPABASE_URL=${PRODUCTION_DB.url}
REACT_APP_SUPABASE_ANON_KEY=${PRODUCTION_DB.key}
REACT_APP_ENVIRONMENT=${env}
`;

  const filePath = path.join(process.cwd(), fileName);
  fs.writeFileSync(filePath, content);
  console.log(`✅ Updated ${fileName}`);
}

function showSimpleSetup() {
  console.log(`
🎯 Simple Database Setup Complete!

📊 Database Configuration:
   - All environments use the same production database
   - No additional databases needed
   - Simple and straightforward

📁 Environment Files Updated:
   ${environments.map(file => `   - ${file}`).join('\n')}

🚀 Ready to Use:
   - Development: npm start
   - Staging: npm run staging  
   - Production: npm run production

⚠️  Important Notes:
   - All environments share the same data
   - Be careful when testing new features
   - Consider creating a separate dev database later if needed

📖 See DATABASE_SETUP_GUIDE.md for more options
`);
}

// Main execution
console.log('🎯 Setting up simple database configuration...\n');

environments.forEach((file, index) => {
  const env = file.replace('.env.', '');
  createSimpleEnvironment(file, env);
});

showSimpleSetup();

#!/usr/bin/env node

/**
 * Safe Database Setup Script
 * Creates separate development and production databases
 */

const fs = require('fs');
const path = require('path');

console.log(`
🛡️  SAFE DATABASE SETUP

This will set up separate databases for safety:

📊 Development Database  ← For: Local + Staging (SAFE TESTING)
📊 Production Database   ← For: Live Users (PROTECTED)

⚠️  IMPORTANT: You need to create a NEW Supabase project for development!

📋 Steps:
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Create a project called "nardil-dev" or similar
4. Copy the new project URL and anon key
5. Run this script again with your dev credentials

🔒 Benefits:
✅ Safe development and testing
✅ No risk to production data
✅ Can test destructive operations
✅ Experiment freely
✅ Production data stays protected

Would you like to continue with the safe setup?
`);

// Development database template (you'll need to fill in real credentials)
const DEV_TEMPLATE = `# Development Environment (SAFE)
# Create a NEW Supabase project for development
# Replace these with your NEW development project credentials

REACT_APP_SUPABASE_URL=https://your-new-dev-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-new-dev-anon-key
REACT_APP_ENVIRONMENT=development
`;

// Production database (your existing)
const PROD_TEMPLATE = `# Production Environment (LIVE)
# Your existing production database

REACT_APP_SUPABASE_URL=https://jgwgluakhmgzemdsqjwc.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2dsdWFraG1nemVtZHNxandjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0ODQ3NDgsImV4cCI6MjA3NTA2MDc0OH0.GvBHIJtD-PM6Jpm1A3ujMBgn3QfxkvRGUYyn7IBDoV4
REACT_APP_ENVIRONMENT=production
`;

function createSafeEnvironment() {
  // Development environment (safe testing)
  fs.writeFileSync('.env.local', DEV_TEMPLATE);
  fs.writeFileSync('.env.staging', DEV_TEMPLATE);
  
  // Production environment (live users)
  fs.writeFileSync('.env.production', PROD_TEMPLATE);
  
  console.log(`
✅ Safe environment files created!

📁 Files created:
   - .env.local (development database)
   - .env.staging (development database) 
   - .env.production (production database)

🔧 Next Steps:
1. Create NEW Supabase project for development
2. Update .env.local and .env.staging with dev credentials
3. Keep .env.production as is (your live database)

🛡️ Result:
   - Development: Safe testing (no risk to live data)
   - Production: Protected live database
`);
}

createSafeEnvironment();

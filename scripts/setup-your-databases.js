#!/usr/bin/env node

/**
 * Setup script for your specific Supabase databases
 * Production: vcnardil@gmail.com's Project
 * Development: Test_stage
 */

const fs = require('fs');
const path = require('path');

console.log(`
🎯 SETTING UP YOUR SUPABASE DATABASES

Your Database Configuration:
📊 Production: vcnardil@gmail.com's Project (Primary Database)
📊 Development: Test_stage (Dev & Testing Database)

🔧 This will configure your environment files for both databases.
`);

// You'll need to get these from your Supabase dashboard
const PRODUCTION_DB = {
  url: 'https://your-production-project.supabase.co',  // Replace with your production URL
  key: 'your-production-anon-key'  // Replace with your production anon key
};

const DEVELOPMENT_DB = {
  url: 'https://your-test-stage-project.supabase.co',  // Replace with your Test_stage URL
  key: 'your-test-stage-anon-key'  // Replace with your Test_stage anon key
};

function createEnvironmentFiles() {
  // Development environment (Test_stage database)
  const devContent = `# Development Environment (Test_stage Database)
# Safe testing without affecting production data

REACT_APP_SUPABASE_URL=${DEVELOPMENT_DB.url}
REACT_APP_SUPABASE_ANON_KEY=${DEVELOPMENT_DB.key}
REACT_APP_ENVIRONMENT=development
`;

  // Staging environment (also uses Test_stage for testing)
  const stagingContent = `# Staging Environment (Test_stage Database)
# Testing before production deployment

REACT_APP_SUPABASE_URL=${DEVELOPMENT_DB.url}
REACT_APP_SUPABASE_ANON_KEY=${DEVELOPMENT_DB.key}
REACT_APP_ENVIRONMENT=staging
`;

  // Production environment (vcnardil@gmail.com's Project)
  const prodContent = `# Production Environment (vcnardil@gmail.com's Project)
# Live database for production users

REACT_APP_SUPABASE_URL=${PRODUCTION_DB.url}
REACT_APP_SUPABASE_ANON_KEY=${PRODUCTION_DB.key}
REACT_APP_ENVIRONMENT=production
`;

  // Write environment files
  fs.writeFileSync('.env.local', devContent);
  fs.writeFileSync('.env.staging', stagingContent);
  fs.writeFileSync('.env.production', prodContent);

  console.log(`
✅ Environment files created!

📁 Files created:
   - .env.local (Test_stage database)
   - .env.staging (Test_stage database)
   - .env.production (vcnardil@gmail.com's Project database)

🔧 Next Steps:
1. Get your Supabase project URLs and anon keys
2. Update the environment files with your actual credentials
3. Test the setup

📖 How to get your credentials:
1. Go to https://supabase.com/dashboard
2. Select your project (Test_stage or vcnardil@gmail.com's Project)
3. Go to Settings → API
4. Copy the Project URL and anon public key
5. Update the environment files

🛡️ Result:
   - Development: Safe testing (Test_stage database)
   - Production: Protected live database (vcnardil@gmail.com's Project)
`);
}

createEnvironmentFiles();

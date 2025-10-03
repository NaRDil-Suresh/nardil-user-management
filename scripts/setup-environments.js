#!/usr/bin/env node

/**
 * Environment Setup Script
 * Helps manage different database environments
 */

const fs = require('fs');
const path = require('path');

const environments = {
  development: {
    file: '.env.local',
    description: 'Local development environment',
    database: 'Development Supabase project'
  },
  staging: {
    file: '.env.staging', 
    description: 'Staging environment for testing',
    database: 'Development Supabase project'
  },
  production: {
    file: '.env.production',
    description: 'Production environment',
    database: 'Production Supabase project'
  }
};

function createEnvironmentFile(env) {
  const template = `# ${environments[env].description}
# Database: ${environments[env].database}

REACT_APP_SUPABASE_URL=your-supabase-url-here
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key-here
REACT_APP_ENVIRONMENT=${env}
`;

  const filePath = path.join(process.cwd(), environments[env].file);
  
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, template);
    console.log(`✅ Created ${environments[env].file}`);
  } else {
    console.log(`⚠️  ${environments[env].file} already exists`);
  }
}

function showInstructions() {
  console.log(`
🛡️  Database Protection Setup

This script helps you set up different environments to protect your production database.

📋 Next Steps:
1. Create a NEW Supabase project for development
2. Update the environment files with your credentials
3. Set up Netlify environment variables for production

📁 Environment Files Created:
${Object.keys(environments).map(env => `   - ${environments[env].file}`).join('\n')}

🔧 Manual Setup Required:
1. Go to Supabase Dashboard → Create new project
2. Copy the new project URL and anon key
3. Update .env.local and .env.staging with dev credentials
4. Update .env.production with production credentials
5. Add production variables to Netlify dashboard

📖 See ENVIRONMENT_SETUP.md for detailed instructions
`);
}

// Main execution
console.log('🛡️  Setting up database protection environments...\n');

Object.keys(environments).forEach(env => {
  createEnvironmentFile(env);
});

showInstructions();

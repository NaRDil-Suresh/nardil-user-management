# NaRDil - User Management System

A modern React application with Supabase backend for user management.

## 🚀 Features

- ✅ User Management (CRUD operations)
- ✅ Real-time database with Supabase
- ✅ Responsive design
- ✅ Automated testing
- ✅ CI/CD pipeline
- ✅ Staging and Production environments

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Backend**: Supabase (PostgreSQL)
- **Deployment**: Netlify
- **CI/CD**: GitHub Actions
- **Testing**: Jest, React Testing Library

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Netlify account
- GitHub account

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd nardil-app
npm install
```

### 2. Environment Setup
```bash
cp env.example .env
# Edit .env with your Supabase credentials
```

### 3. Run Development Server
```bash
npm start
```

### 4. Run Tests
```bash
npm test
npm run test:coverage
```

### 5. Build for Production
```bash
npm run build
```

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `REACT_APP_SUPABASE_URL` | Your Supabase project URL |
| `REACT_APP_SUPABASE_ANON_KEY` | Your Supabase anon key |

## 🗄️ Database Setup

1. Create a Supabase project
2. Create a table named `User` with columns:
   - `id` (int8, primary key, auto-increment)
   - `user_name` (text)
   - `mail_id` (text)
   - `user_code` (text)
   - `created_at` (timestamptz, default: now())
3. Configure Row Level Security (RLS)

## 🚀 Deployment

### Automated Deployment (Recommended)

The project includes GitHub Actions for automated deployment:

- **Staging**: Deploys on push to `develop` branch
- **Production**: Deploys on push to `main` branch

### Manual Deployment

```bash
# Staging
npm run deploy:staging

# Production
npm run deploy:production
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
npm run lint:fix
```

## 📊 CI/CD Pipeline

The automated pipeline includes:

1. **Code Quality**: Linting and testing
2. **Build**: Production build creation
3. **Deploy Staging**: Auto-deploy to staging on `develop` branch
4. **Deploy Production**: Auto-deploy to production on `main` branch
5. **Client Notification**: Automated notifications for deployments

## 🌍 Environments

- **Development**: `npm start` - Local development
- **Staging**: Auto-deployed from `develop` branch
- **Production**: Auto-deployed from `main` branch

## 📝 Development Workflow

1. **Feature Development**: Create feature branch from `develop`
2. **Testing**: Write tests for new features
3. **Pull Request**: Create PR to `develop` branch
4. **Code Review**: Review and merge to `develop`
5. **Staging Deploy**: Automatic deployment to staging
6. **Client Testing**: Client tests on staging environment
7. **Production Deploy**: Merge `develop` to `main` for production

## 🔒 Security

- Row Level Security (RLS) enabled on Supabase
- Environment variables for sensitive data
- HTTPS enforced on all environments

## 📞 Support

For issues and questions, please create an issue in the GitHub repository.

## 📄 License

This project is licensed under the MIT License.

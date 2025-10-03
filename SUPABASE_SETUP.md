# Supabase Setup Guide

## Step 1: Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (recommended) or email
4. Create a new project

## Step 2: Create Database Table
1. In your Supabase dashboard, go to "Table Editor"
2. Click "Create a new table"
3. Name it: `users`
4. Add these columns:
   - `id` (type: int8, primary key, auto-increment)
   - `user_name` (type: text)
   - `mail_id` (type: text)
   - `user_code` (type: text)
   - `created_at` (type: timestamptz, default: now())

## Step 3: Get Your Credentials
1. Go to "Settings" → "API"
2. Copy your:
   - Project URL
   - Anon public key

## Step 4: Update Your Code
Replace these lines in your `index.html`:
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

With your actual credentials:
```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

## Step 5: Set Row Level Security (RLS)
1. Go to "Authentication" → "Policies"
2. Create a new policy for the `users` table
3. Enable RLS and create a policy that allows all operations (for now)

## Step 6: Deploy to Netlify
1. Upload your updated `index.html` to Netlify
2. Your app will now use Supabase as the database!

## Features You'll Have:
- ✅ Real database storage
- ✅ Add users
- ✅ View users
- ✅ Edit users
- ✅ Delete users
- ✅ Data persists across sessions
- ✅ Multiple users can access the same data

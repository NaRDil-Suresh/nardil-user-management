# 🔄 Database Synchronization Guide

## **The Challenge:**
When you have separate development and production databases, you need to keep them in sync when making changes.

## **What Needs Synchronization:**

### ✅ **Database Structure Changes:**
- Adding new columns
- Removing columns
- Changing data types
- Adding/removing tables
- Adding indexes
- Adding constraints

### ✅ **Data Changes:**
- Initial data setup
- Reference data updates
- User roles and permissions

## **🛠️ Solutions:**

### **Option 1: Manual Synchronization**
```
1. Make changes in Development Database
2. Test everything works
3. Manually apply same changes to Production Database
4. Deploy application
```

**Pros:** Simple, direct control
**Cons:** Error-prone, time-consuming, easy to forget steps

### **Option 2: Migration Scripts (Recommended)**
```
1. Make changes in Development Database
2. Create migration script
3. Test migration on Development
4. Apply migration to Production
5. Deploy application
```

**Pros:** Reproducible, version-controlled, safer
**Cons:** Requires discipline, initial setup

### **Option 3: Database Schema Management Tools**
- Supabase CLI
- Database versioning tools
- Automated migration systems

## **🔄 Recommended Workflow:**

### **Step 1: Development**
```bash
# 1. Make changes in development database
# 2. Test your application
npm start
```

### **Step 2: Create Migration**
```bash
# Create migration script for your changes
npm run migrate:create add_user_roles
```

### **Step 3: Test Migration**
```bash
# Test migration on development database
npm run migrate:dev
```

### **Step 4: Apply to Production**
```bash
# Apply migration to production database
npm run migrate:prod
```

### **Step 5: Deploy**
```bash
# Deploy application
npm run production
```

## **📋 Migration Best Practices:**

### **1. Always Test First**
- Test changes in development
- Test migration scripts
- Verify everything works

### **2. Create Migration Scripts**
- Document all database changes
- Make scripts idempotent (safe to run multiple times)
- Include rollback instructions

### **3. Backup Before Changes**
- Always backup production database
- Test restore process
- Keep backups for at least 30 days

### **4. Apply During Low Traffic**
- Schedule migrations during maintenance windows
- Notify users of planned downtime
- Have rollback plan ready

## **🚨 Emergency Procedures:**

### **If Migration Fails:**
1. **Stop the migration**
2. **Restore from backup**
3. **Investigate the issue**
4. **Fix the migration script**
5. **Test again in development**

### **If Data is Corrupted:**
1. **Immediately restore from backup**
2. **Identify the cause**
3. **Fix the issue**
4. **Test thoroughly**
5. **Re-apply migration**

## **🛡️ Safety Measures:**

### **Development Safety:**
- Use development database for all testing
- Never test on production data
- Create test data for development

### **Production Safety:**
- Always backup before changes
- Test migrations on development first
- Have rollback plan ready
- Monitor application after changes

## **📊 Example Migration:**

### **Adding a New Column:**
```sql
-- Migration: Add user_phnumber column
-- Date: 2024-01-15

-- Add the column
ALTER TABLE "User" 
ADD COLUMN IF NOT EXISTS "user_phnumber" TEXT;

-- Add index for performance
CREATE INDEX IF NOT EXISTS "idx_user_phnumber" 
ON "User"("user_phnumber");

-- Add comment
COMMENT ON COLUMN "User"."user_phnumber" IS 'User phone number';
```

### **Rollback Script:**
```sql
-- Rollback: Remove user_phnumber column
-- Date: 2024-01-15

-- Remove index first
DROP INDEX IF EXISTS "idx_user_phnumber";

-- Remove column
ALTER TABLE "User" 
DROP COLUMN IF EXISTS "user_phnumber";
```

## **🔄 Your Workflow:**

### **For Small Changes:**
1. Make changes in development
2. Test thoroughly
3. Apply same changes to production
4. Deploy application

### **For Major Changes:**
1. Create migration script
2. Test migration on development
3. Backup production database
4. Apply migration to production
5. Deploy application
6. Monitor for issues

## **📞 Support:**

- **Supabase Dashboard**: Check database logs and status
- **Migration Logs**: Keep track of applied migrations
- **Backup Status**: Verify backups are working
- **Application Monitoring**: Watch for errors after changes

---

**Remember**: Always test in development first, and never skip the backup step! 🛡️

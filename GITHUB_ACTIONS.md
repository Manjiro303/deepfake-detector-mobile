# 🔧 GitHub Actions Setup Guide

## Current Status

✅ **Working:** Basic testing and validation  
⚠️ **Optional:** APK building (requires EXPO_TOKEN)

## What Works Now

The current GitHub Actions workflow:
1. ✅ Installs dependencies
2. ✅ Validates package.json
3. ✅ Generates assets (icons, splash screen)
4. ✅ Uploads generated assets as artifacts
5. ⚠️ APK building (only if EXPO_TOKEN is set)

## To Enable APK Building (Optional)

### Step 1: Get Expo Access Token

1. Go to https://expo.dev
2. Sign up or log in
3. Go to **Account Settings** → **Access Tokens**
4. Click **Create Token**
5. Give it a name (e.g., "GitHub Actions")
6. Copy the token (starts with `expo-...`)

### Step 2: Add Token to GitHub

1. Go to your GitHub repo
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `EXPO_TOKEN`
5. Value: Paste your Expo token
6. Click **Add secret**

### Step 3: Trigger Build

Push to main branch or manually trigger:
1. Go to **Actions** tab
2. Click **Build & Test** workflow
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## Understanding the Workflow

### Job 1: Test (Always Runs)
```yaml
test:
  - Checkout code
  - Setup Node.js
  - Install dependencies
  - Generate assets
  - Upload assets as artifacts
```

This job ALWAYS runs and will succeed.

### Job 2: Build APK (Optional)
```yaml
build-apk:
  - Only runs on manual trigger
  - Requires EXPO_TOKEN secret
  - Builds Android APK via EAS
  - Continues even if it fails
```

This job only runs if you manually trigger the workflow AND have EXPO_TOKEN set.

## Viewing Build Artifacts

After workflow completes:
1. Go to **Actions** tab
2. Click on the workflow run
3. Scroll down to **Artifacts**
4. Download **generated-assets.zip**

## Troubleshooting

### "EXPO_TOKEN not found"
This is expected if you haven't added the token. The workflow will skip the APK build.

### Sharp installation fails
This is fine - the workflow will generate SVG files instead of PNG.

### Build takes too long
EAS builds typically take 10-15 minutes. Be patient!

## Manual APK Building (Recommended)

Instead of GitHub Actions, build APK locally:
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build --platform android --profile preview

# Download from expo.dev after ~10 minutes
```

This is often easier than setting up GitHub Actions for building.

## Disabling APK Building

If you don't want APK building at all, the current workflow is perfect as-is. 
The `build-apk` job will simply be skipped.

## Cost

- **GitHub Actions:** 2,000 free minutes/month
- **EAS Builds:** 30 free builds/month
- Both are sufficient for small projects

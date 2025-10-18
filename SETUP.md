# 🚀 Complete Setup Guide

## Step 1: Prerequisites

Install these first:
```bash
# Node.js (v16 or higher)
# Download from: https://nodejs.org

# Expo CLI
npm install -g expo-cli

# EAS CLI (for building apps)
npm install -g eas-cli
```

## Step 2: Clone & Setup
```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/deepfake-detector-mobile.git
cd deepfake-detector-mobile

# Install dependencies
npm install

# Install Sharp for image generation
npm install sharp --save-dev

# Generate assets
node generate-assets.js
```

## Step 3: Run the App

### Option A: Web Browser (Easiest)
```bash
npm start
# Press 'w' to open in browser
```

### Option B: Physical Device
```bash
npm start
# Scan QR code with Expo Go app
# iOS: Download from App Store
# Android: Download from Play Store
```

### Option C: Emulator
```bash
# iOS Simulator (Mac only)
npm run ios

# Android Emulator
npm run android
```

## Step 4: Test the App

1. Click "Choose Video" or "Record Video"
2. Select/record a test video
3. Click "Analyze Video"
4. See results (currently demo mode)

## Step 5: Add Real AI Model (Optional)

See `BUILD.md` for model conversion instructions.

Place converted model files in:

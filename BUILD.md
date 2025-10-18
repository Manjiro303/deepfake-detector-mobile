# 🏗️ Building the Application

This guide shows how to build installable APK (Android) or IPA (iOS) files.

## Prerequisites

1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Create Expo account at https://expo.dev

3. Login to EAS:
```bash
eas login
```

4. Configure your project:
```bash
eas build:configure
```

## 📱 Build Android APK

### Method 1: Using EAS (Recommended)
```bash
# Build APK for testing
eas build --platform android --profile preview

# Build production APK
eas build --platform android --profile production-apk
```

The APK will be available in your Expo dashboard after ~10-15 minutes.

### Method 2: Using Makefile
```bash
make build-android
```

### Method 3: Local Build (Advanced)
```bash
# Install Android Studio first
npx expo run:android --variant release
```

## 🍎 Build iOS IPA

**Note:** Requires Mac and Apple Developer Account ($99/year)
```bash
# Build IPA
eas build --platform ios --profile production

# Or using Makefile
make build-ios
```

## 🌐 Build for Web
```bash
npx expo export:web
```

Output will be in `dist/` folder.

## 📦 Download Built App

After EAS build completes:

1. Go to https://expo.dev
2. Navigate to your project
3. Click "Builds"
4. Download the APK/IPA file

Or use CLI:
```bash
eas build:list
```

## 🚀 Quick Setup & Build
```bash
# Complete setup in one command
make setup

# Build Android APK
make build-android
```

## 📋 Build Profiles

Defined in `eas.json`:

- **development** - For testing with Expo Go
- **preview** - APK for testing without store
- **production** - App Bundle for Google Play Store
- **production-apk** - APK for direct distribution

## 🔧 Troubleshooting

### Build fails with "assets not found"
```bash
node generate-assets.js
```

### EAS login issues
```bash
eas logout
eas login
```

### Clear cache
```bash
make clean
npm install
```

## 📱 Install APK on Android Device

1. Download APK from EAS dashboard
2. Enable "Install from Unknown Sources" on your device
3. Transfer APK to device
4. Open and install

## 🎯 Distribution Options

### Android:
- **Direct APK** - Share APK file directly
- **Google Play Store** - Upload app-bundle from production build
- **Internal Testing** - Use Google Play Internal Testing

### iOS:
- **TestFlight** - For beta testing (free)
- **App Store** - For public release
- **Ad Hoc** - Limited devices (100 max)

## 💰 Costs

- **Expo EAS** - Free tier: 30 builds/month
- **Google Play** - $25 one-time registration
- **Apple Developer** - $99/year subscription

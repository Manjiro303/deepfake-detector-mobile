# 🛡️ Deepfake Detector Mobile

> **⚠️ Demo Mode** - Currently returns random results until AI model is integrated.

Mobile application for detecting deepfake videos using on-device machine learning. Built with React Native, Expo, and TensorFlow.js.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)

## ✨ Features

- 📹 **Video Upload** - Select videos from gallery
- 🎥 **Video Recording** - Record videos in-app (max 30s)
- 🧠 **AI Ready** - TensorFlow.js integration structure
- 📊 **Results Display** - Confidence scores and processing metrics
- 🔒 **Privacy First** - Designed for on-device processing
- 📱 **Cross Platform** - iOS, Android, and Web support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI

### Installation
```bash
# Clone repository
git clone https://github.com/Manjiro303/deepfake-detector-mobile.git
cd deepfake-detector-mobile

# Install dependencies
npm install

# Generate image assets
npm install sharp --save-dev
node generate-assets.js

# Start the app
npm start
```

Then:
- Press `w` to open in web browser
- Press `a` to run on Android emulator
- Press `i` to run on iOS simulator
- Scan QR code with Expo Go app on your phone

## 📱 Build Installable App

### Android APK
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build APK (takes ~10-15 minutes)
eas build --platform android --profile preview

# Download from https://expo.dev when complete
```

### iOS IPA (Mac only)
```bash
eas build --platform ios --profile production
```

See [BUILD.md](BUILD.md) for detailed instructions.

## 📂 Project Structure

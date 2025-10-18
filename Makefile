# Deepfake Detector Mobile - Quick Commands

.PHONY: install assets start ios android build-android build-ios clean help

help:
	@echo "📱 Deepfake Detector Mobile - Available Commands:"
	@echo ""
	@echo "  make install        - Install all dependencies"
	@echo "  make assets         - Generate image assets"
	@echo "  make start          - Start Expo development server"
	@echo "  make ios            - Run on iOS simulator"
	@echo "  make android        - Run on Android emulator"
	@echo "  make build-android  - Build Android APK"
	@echo "  make build-ios      - Build iOS IPA"
	@echo "  make clean          - Clean build files"
	@echo ""

install:
	@echo "📦 Installing dependencies..."
	npm install
	npm install sharp --save-dev

assets:
	@echo "🎨 Generating assets..."
	node generate-assets.js

start:
	@echo "🚀 Starting development server..."
	npm start

ios:
	@echo "📱 Running on iOS..."
	npm run ios

android:
	@echo "🤖 Running on Android..."
	npm run android

build-android:
	@echo "🏗️ Building Android APK..."
	eas build --platform android --profile production-apk

build-ios:
	@echo "🏗️ Building iOS IPA..."
	eas build --platform ios --profile production

clean:
	@echo "🧹 Cleaning..."
	rm -rf node_modules
	rm -rf .expo
	rm -rf dist
	@echo "✨ Clean complete!"

setup: install assets
	@echo "✅ Setup complete! Run 'make start' to begin"

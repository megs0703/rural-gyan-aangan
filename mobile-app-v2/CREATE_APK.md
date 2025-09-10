# 📱 Create APK for शिक्षा सेतु - Step by Step

## 🚀 Method 1: EAS Build (Easiest)

### Step 1: Create Expo Account
1. Go to https://expo.dev
2. Sign up with email
3. Verify your account

### Step 2: Login via Terminal
```bash
npx expo login
# Enter your expo.dev credentials
```

### Step 3: Build APK
```bash
npx eas-cli build --platform android --profile preview
```

### Step 4: Download APK
- Check https://expo.dev/accounts/[username]/projects/shiksha-setu/builds
- Download APK when build completes (~15 minutes)

## 🔧 Method 2: Local Build (Advanced)

### Prerequisites
- Install Android Studio
- Install Java JDK 11+
- Set up Android SDK

### Steps
```bash
# 1. Eject from Expo
npx expo eject

# 2. Navigate to android folder
cd android

# 3. Build APK
./gradlew assembleRelease

# 4. Find APK at:
# android/app/build/outputs/apk/release/app-release.apk
```

## 🎯 Method 3: Online Build Service

### Using Expo Web Interface
1. Go to https://expo.dev
2. Upload your project
3. Click "Build" → "Android APK"
4. Wait for completion
5. Download APK

## ⚡ Quick Test (No APK needed)

### Use Expo Go App
```bash
npx expo start
```
1. Install Expo Go from Play Store
2. Scan QR code
3. App runs instantly on device

## 🔍 Troubleshooting

### If EAS Build Fails
- Check internet connection
- Verify Expo account is active
- Try: `npx eas-cli build --platform android --profile preview --clear-cache`

### If Local Build Fails
- Ensure Android Studio is installed
- Check Java version: `java -version`
- Verify Android SDK path

## 📋 What You Need
- ✅ Expo account (free)
- ✅ Internet connection
- ✅ 15-20 minutes for build

## 🎯 Recommended Approach
**Use Method 1 (EAS Build)** - it's the easiest and most reliable!
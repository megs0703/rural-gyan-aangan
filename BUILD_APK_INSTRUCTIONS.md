# 📱 Building APK for शिक्षा सेतु Mobile App

## 🚀 Method 1: EAS Build (Recommended)

### Prerequisites
1. **Expo Account**: Create account at https://expo.dev
2. **EAS CLI**: Already installed

### Steps to Build APK

1. **Login to Expo**
```bash
npx expo login
```

2. **Build APK**
```bash
npx eas build --platform android --profile preview
```

3. **Download APK**
- Build will be available at https://expo.dev/accounts/[username]/projects/shiksha-setu/builds
- Download the APK file once build completes

## 🔧 Method 2: Local Build (Alternative)

### Prerequisites
- Android Studio installed
- Android SDK configured
- Java JDK 11+

### Steps

1. **Eject to Bare Workflow**
```bash
npx expo eject
```

2. **Build with Gradle**
```bash
cd android
./gradlew assembleRelease
```

3. **Find APK**
```
android/app/build/outputs/apk/release/app-release.apk
```

## 📦 Method 3: Expo Development Build

### For Testing on Device

1. **Install Expo Development Build**
```bash
npx expo install expo-dev-client
```

2. **Build Development Client**
```bash
npx eas build --profile development --platform android
```

3. **Install on Device**
- Download and install the development build APK
- Use `npx expo start --dev-client` to load your app

## 🎯 Quick APK Generation

### Using Online Service (Fastest)

1. **Upload to Expo**
```bash
npx expo publish
```

2. **Use Expo Build Service**
- Go to https://expo.dev
- Select your project
- Click "Build" → "Android" → "APK"
- Wait for build completion
- Download APK

## 📋 Build Configuration

The `eas.json` file is already configured:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

## 🔐 Signing (For Production)

### Generate Keystore
```bash
keytool -genkey -v -keystore shiksha-setu.keystore -alias shiksha-setu -keyalg RSA -keysize 2048 -validity 10000
```

### Add to eas.json
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "apk",
        "credentialsSource": "local"
      }
    }
  }
}
```

## 📱 Testing APK

1. **Enable Unknown Sources** on Android device
2. **Install APK** via file manager or ADB
3. **Test all features**:
   - Login/Register
   - Language switching
   - Virtual Classroom (camera permissions)
   - AI Tutor
   - Code Lab
   - Profile management

## 🚨 Troubleshooting

### Common Issues

1. **Build Fails**
   - Check Expo account limits
   - Verify app.json configuration
   - Ensure all dependencies are compatible

2. **APK Won't Install**
   - Enable "Install from Unknown Sources"
   - Check Android version compatibility
   - Verify APK is not corrupted

3. **App Crashes**
   - Check device permissions
   - Verify camera/microphone access
   - Test on different Android versions

## 📊 Build Status

- ✅ **App Configuration**: Complete
- ✅ **Dependencies**: All installed
- ✅ **Build Config**: EAS ready
- ⏳ **APK Generation**: Ready to build
- 📱 **Testing**: Ready for device testing

## 🎯 Next Steps

1. Run `npx expo login`
2. Run `npx eas build --platform android --profile preview`
3. Wait for build completion (~10-15 minutes)
4. Download and test APK on Android device

The शिक्षा सेतु mobile app is ready for APK generation! 🚀
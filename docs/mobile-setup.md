# Mobile app (Expo) quick setup

This file shows the exact commands to create a React Native (Expo) app for this project and how to connect it to the existing backend/auth approach.

1. Create the Expo app (run locally):

```powershell
npx create-expo-app mobile-app --template expo-template-blank-typescript
cd mobile-app
```

2. Add navigation and dependencies:

```powershell
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

3. Add Firebase (optional) or keep mock auth to match web:

```powershell
npm install firebase
```

4. Start the app during development:

```powershell
npm run dev
# or
npx expo start
```

5. Basic app structure suggestions (create under `mobile-app/src`):

- `src/screens/LoginScreen.tsx` — auth screen (Firebase or mock)
- `src/navigation/AppNavigator.tsx` — role-aware navigation (admin/teacher/student stacks)
- `src/screens/Admin/*`, `Teacher/*`, `Student/*` — mirrored functionality from web

6. Syncing shared logic

- Move shared business logic (API clients, helpers) into `lib/` at the repo root so both web and mobile can import or reference it.

Notes

- This repo already contains `docs/mobile-plan.md` with milestones and recommendations.
- I can scaffold the initial Expo project in `mobile-app/` if you'd like — it requires installing dependencies which can't be fully completed here without running `npx create-expo-app` locally. I can create starter files and a `mobile-app/README.md` pointing to the commands above.

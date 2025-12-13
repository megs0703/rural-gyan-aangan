# Mobile App Plan (React Native)

This document outlines a pragmatic approach to build the mobile application alongside the web platform.

## Goals

- Provide parity with web features: classes, AI tutor, code lab (mobile-friendly), profile, and exams.
- Offline-friendly content caching for low-bandwidth areas.
- Support English and Hindi with a language toggle.

## Tech stack recommendation

- Expo (managed) for fast iteration and cross-platform builds.
- React Native with TypeScript.
- Shared libraries for business logic (move common logic to `lib/`), and REST/Firebase APIs for sync.

## Initial scaffold

1. Create `mobile/` or `mobile-app/` in repo root.
2. `npx create-expo-app mobile-app --template expo-template-blank-typescript`
3. Add auth and state management (Firebase + Context or Redux Toolkit).
4. Add web support later via `expo prebuild` and `react-native-web` if needed.

## Important considerations

- Keep UI patterns consistent with web (same color tokens, icons).
- Implement low-bandwidth sync for lessons and notes.
- Secure proctoring will require native device camera access and streaming — plan privacy & consent flows.

## Milestones

1. Authentication & role-based routing (admin/teacher/student).
2. Basic dashboards & class join flow.
3. AI Tutor integration (chat + media upload).
4. Exams + lightweight proctoring (camera capture, upload to server for analysis).

# User Roles & Dashboards

This document expands the project with three user roles and their dashboard requirements, derived from `update.md`.

## Roles

1. Admin
   - Full system access and management
   - Dashboard sections:
     - Teacher Details: username, full name, qualifications, subjects taught
     - Student Details: username, full name, current standard, enrollment (year-roll), parent contact, address
     - Logs:
       - Teachers: live lectures count, leaves, assigned subjects/classes, reviews & ratings
       - Students: attendance, performance, feedback, history (previous marks/attendance)
     - Profile management

2. Teacher
   - Conduct classes, create quizzes, review performance
   - Dashboard sections:
     - Virtual classroom (collaboration + screen/whiteboard)
     - Quiz & exam setup
     - Allocated subjects and classes
     - Class student lists (only classes they teach), class-teacher full view if assigned
     - Performance analysis (graphs + AI insights)
     - Profile

3. Student
   - Attend classes, take quizzes/exams, use AI tutor and code lab
   - Dashboard sections:
     - Virtual classroom (with live translation to selected language)
     - Materials: exams, quizzes (proctored), notes
     - AI Tutor: accept text/image/audio/docs, multilingual responses
     - Virtual Code Editor
     - Profile: marks, attendance, reports, personal details

## Cross-cutting requirements

- Mobile compatibility and React Native mobile app.
- Multilingual support: English and Hindi toggle (extendable to Punjabi/Urdu).
- Privacy-preserving proctoring and engagement analytics.

## Acceptance notes

- Each dashboard page should expose APIs (or mock data) for the sections above.
- Start with placeholders and progressively wire real data and permissions.

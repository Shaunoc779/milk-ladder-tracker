# 🥛 Milk Ladder Tracker

A cross-platform mobile app to help parents track their child's progress through the **Cow's Milk Protein Allergy (CMPA) iMAP Milk Ladder**. Built with React Native (Expo) and Firebase.

## Features

- 📊 **Dashboard** — At-a-glance view of your child's current ladder step and today's summary
- 📝 **Daily Log** — Log milk/dairy intake with type, quantity, and time; flag symptom days
- 🚨 **Symptom Tracking** — Record and track reactions: skin outbreaks, eczema, diarrhoea, vomiting, reflux, bloating, hives, congestion, irritability, and more
- 📅 **Calendar View** — Monthly calendar with colour-coded days (green = good, red = flagged)
- 🪜 **Ladder Progress** — Visual step-by-step display with progress tracking and step advancement
- 📜 **History** — Filterable list of past daily logs
- 👨‍👩‍👧 **Partner Sharing** — Invite a second parent to share and view the same child's data
- ⚙️ **Settings** — Manage child profile, partner access, and app preferences

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React Native + Expo (managed workflow) |
| Language | TypeScript |
| Backend/Auth | Firebase (Authentication + Cloud Firestore) |
| State Management | React Context + Hooks |
| Navigation | React Navigation (bottom tabs + stack) |
| Calendar | react-native-calendars |
| Icons | @expo/vector-icons (Ionicons) |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) — `npm install -g expo-cli`
- [Expo Go](https://expo.dev/client) app on your iOS or Android device (for testing)
- A [Firebase](https://firebase.google.com/) account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/milk-ladder-tracker.git
cd milk-ladder-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (e.g. `milk-ladder-tracker`)
3. Enable **Authentication** → Sign-in method → **Email/Password**
4. Enable **Cloud Firestore** → Start in test mode
5. In Project Settings → Your apps → Add a **Web app**
6. Copy your config and replace the placeholder values in `firebaseConfig.ts`:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Start the App

```bash
npx expo start
```

Scan the QR code with **Expo Go** (Android) or the **Camera app** (iOS).

To run on a simulator:
```bash
npx expo start --ios      # iOS Simulator (macOS only)
npx expo start --android  # Android Emulator
```

## How the Milk Ladder Works

The iMAP Milk Ladder is a structured programme to gradually reintroduce cow's milk protein into a child's diet. Each step must be tolerated for a minimum of 7 days before advancing.

| Step | Name | Examples |
|---|---|---|
| 1 | Well-baked milk (complex matrix) | Malted milk biscuits, baked cakes/muffins |
| 2 | Less well-baked milk (simple mixture) | Pancakes, waffles, scones |
| 3 | Soft-cooked/processed cheese | Cheese on pizza, cheese sauce pasta |
| 4 | Yoghurt and fermented products | Yoghurt, fromage frais |
| 5 | Cold fresh milk (small amounts) | Splash on cereal, milkshakes |
| 6 | Uncooked milk (full amounts) | Full cup of milk, ice cream, custard |

> ⚠️ Always follow the guidance of a registered dietitian or allergist when using this programme.

## Partner Sharing

Two parents can share access to the same child's data:

1. One parent creates the child profile and shares it
2. From **Settings → Partner Sharing**, enter the partner's email and send an invite
3. The partner receives an invitation to join and access the shared log

Both parents can view and edit the daily logs and ladder progress in real time via Firestore.

## Project Structure

```
/
├── App.tsx                     # Root component with providers
├── firebaseConfig.ts           # Firebase initialisation (add your config here)
├── src/
│   ├── context/                # Auth and Child state providers
│   ├── data/                   # Static ladder steps data
│   ├── models/                 # TypeScript interfaces
│   ├── navigation/             # App, Auth, and Tab navigators
│   ├── screens/                # All screen components
│   │   ├── auth/               # Login and Register
│   │   ├── DashboardScreen
│   │   ├── DailyLogScreen
│   │   ├── CalendarScreen
│   │   ├── LadderProgressScreen
│   │   ├── HistoryScreen
│   │   └── SettingsScreen
│   ├── components/             # Reusable UI components
│   ├── services/               # Firebase service layer
│   ├── theme/                  # Colours, spacing, typography
│   └── utils/                  # Helper functions
```

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## License

MIT © Milk Ladder Tracker Contributors
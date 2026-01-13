# Vut - A Mobile App for Badminton Player Connections

Vut is a React Native mobile application that helps badminton players connect, organize matches, and build a community. The app provides an intuitive platform for players to find partners, arrange games, and manage their badminton activities.

The application features a modern, tab-based interface with authentication flows, social integration, and real-time chat capabilities. It enables players to create and join matches, specify their skill levels, manage venue bookings, and coordinate with other players seamlessly.

## Repository Structure
```
.
├── app/                      # Main application code
│   ├── _layout.tsx          # Root layout component with navigation setup
│   ├── (tabs)/              # Tab-based navigation screens
│   ├── login.tsx            # Authentication screen
│   ├── signup.tsx           # User registration screen
│   └── modal.tsx            # Modal screen component
├── components/              # Reusable UI components
│   ├── FloatingButton.tsx   # Floating action button component
│   ├── StyledText.tsx       # Custom text styling component
│   └── Themed.tsx          # Theme-aware components
├── constants/               # Application constants
│   └── Colors.ts           # Color definitions
└── assets/                 # Static assets (images, fonts)
```

## Usage Instructions
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for iOS development)
- Android Studio & Android SDK (for Android development)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd vut

# Install dependencies
npm install

#Start the development local
npx expo start --tunnel --port 4200 -c
# Start the development server
npx expo start
```

### Build App
```bash
npm install -g eas-cli

# IOS
eas build -p ios --profile preview

# android preview
# Trả về file .apk (cài trực tiếp)
eas build -p android --profile preview --message "Preview 1.1: google auth android"

# Build dev file .apk
# build bang tai khoan expo
eas build --profile development --platform android 

wsl -d Ubuntu
#build bang may local
eas build -p android --local --profile development

hoặc

cd android
./gradlew assembleDebug

adb push "\\wsl$\Ubuntu\home\truongnv\app-spc\build-1762851848331.apk" /sdcard/Download/
adb push "C:\Users\Nguyen Truong\Desktop\sport connect\spc-app\vut\android\app\build\outputs\apk\debug\app-debug.apk" /sdcard/Download/
adb push "C:\Users\Nguyen Truong\Desktop\sport connect\spc-app\vut\build-1767976774605.apk" /sdcard/Download/

adb install "\\wsl$\Ubuntu\home\truongnv\app-spc\build-1765721939260.apk"
adb install "C:\Users\Nguyen Truong\Desktop\sport connect\spc-app\vut\build-1767972269465.apk"
adb logcat | find "ReactNative"
npx expo start --dev-client --lan --port 8081
```

```bash
# xem thu vien nao ko tuong thich
npx expo-doctor
# Kiem tra package.json cai package dung voi version sdk
npx expo install
```


### Quick Start
1. Launch the app and create an account or log in
2. Navigate through the tabs:
    - Solo player: Find individual matches
    - Group: Join or create group sessions
    - Profile: Manage your profile settings

### More Detailed Examples
Creating a Match:
```javascript
// Navigate to Solo player tab
// Click the floating action button
// Fill in match details:
// - Time slot: "22:12 - 23:30"
// - Location: "Ba Đình"
// - Price: "120k"
// - Level: "TB" (Intermediate)
// - Players needed: "8"
```

### Troubleshooting
Common issues and solutions:

1. Authentication Issues
    - Ensure you have a stable internet connection
    - Verify your credentials
    - Check if the server is accessible

2. Loading Problems
    - Clear the app cache
    - Restart the Expo development server
    - Update Expo SDK if needed

## Data Flow
The application follows a client-server architecture with RESTful API communication.

```ascii
[User Input] -> [React Native UI] -> [API Layer] -> [Backend Server]
                      ↑                   ↓
                 [Local State] <- [Data Processing]
```

Key interactions:
- User authentication through secure JWT tokens
- Real-time chat using WebSocket connections
- Local state management for UI components
- API integration for match creation and management
- Image handling through secure cloud storage
- Push notifications for match updates
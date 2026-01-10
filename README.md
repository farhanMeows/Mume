# Mume - Music Streaming App

A modern React Native music streaming application built with Expo, featuring a clean UI and seamless playback experience powered by Saavn API.

## Features

- 🎵 **Music Playback**: Stream songs with play, pause, skip controls
- 🔍 **Search**: Search for songs and artists with debounced search
- 👤 **Artist Pages**: Browse artist profiles with songs and albums
- 📋 **Queue Management**: Add songs to queue with simple tap interface
- 🎨 **Theme Support**: Light, Dark, and System theme modes
- 💾 **Persistence**: Recently played songs and queue saved locally
- 🎯 **Mini Player**: Floating mini player above bottom tabs
- 📱 **Native Feel**: Smooth animations and gestures

## Tech Stack

### Core

- **React Native 0.81.5** - Mobile framework
- **Expo ~54** - Development platform
- **TypeScript 5.9** - Type safety

### UI & Navigation

- **React Navigation** - Navigation library
  - Native Stack Navigator
  - Bottom Tabs Navigator
- **twrnc** - Tailwind CSS for React Native
- **@expo/vector-icons** - Icon library (Ionicons)
- **react-native-safe-area-context** - Safe area handling

### State Management

- **Zustand** - Lightweight state management
- **AsyncStorage** - Local persistence

### Audio & Media

- **expo-av** - Audio playback
- **Saavn API** - Music streaming backend

## Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- For iOS: macOS with Xcode
- For Android: Android Studio and SDK

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd Mume
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npx expo start
```

4. **Run on device/simulator**

For Android:

```bash
npx expo run:android
```

For iOS:

```bash
npx expo run:ios
```

### Initial Project Setup (Reference)

The project was initialized with:

```bash
npx create-expo-app Mume --template blank-typescript
npm i twrnc
npm i zustand
npm install @react-navigation/native-stack
npm install @react-navigation/elements
npm install @react-navigation/bottom-tabs
npm install @expo/vector-icons
npm install @react-native-async-storage/async-storage
npm install expo-av
```

## Architecture

### Project Structure

```
Mume/
├── src/
│   ├── api/                    # API services
│   │   └── saavn.ts           # Saavn API integration
│   ├── audio/                  # Audio playback
│   │   └── audioService.ts    # Expo AV wrapper
│   ├── components/             # Reusable components
│   │   ├── BottomTabBar.tsx
│   │   ├── Header.tsx
│   │   ├── HorizontalList.tsx
│   │   ├── MiniPlayer.tsx     # Floating mini player
│   │   ├── Section.tsx
│   │   ├── SongRow.tsx        # Song list item with menu
│   │   └── Tabs.tsx
│   ├── navigation/             # Navigation setup
│   │   ├── AppNavigator.tsx
│   │   ├── BottomTabs.tsx     # Tab navigation
│   │   └── types.ts           # Navigation types
│   ├── screens/                # Screen components
│   │   ├── Artist/
│   │   │   ├── ArtistDetailScreen.tsx
│   │   │   └── ArtistsListScreen.tsx
│   │   ├── Favorites/
│   │   ├── Home/
│   │   │   ├── HomeScreen.tsx
│   │   │   ├── ArtistsTab.tsx
│   │   │   ├── SongsTab.tsx
│   │   │   ├── SuggestedSongs.tsx
│   │   │   └── SuggestedTab.tsx
│   │   ├── Player/
│   │   │   └── PlayerScreen.tsx
│   │   ├── Playlists/
│   │   ├── Queue/
│   │   │   └── QueueScreen.tsx
│   │   ├── Search/
│   │   │   └── SearchScreen.tsx
│   │   ├── SeeAll/
│   │   │   └── SongListScreen.tsx
│   │   └── Settings/
│   │       └── SettingsScreen.tsx
│   ├── storage/                # Storage utilities
│   │   └── playerStorage.ts
│   ├── store/                  # State management
│   │   └── songStore.ts       # Zustand store
│   ├── theme/                  # Theming
│   │   ├── colors.ts
│   │   └── ThemeContext.tsx
│   └── utils/                  # Helper functions
│       ├── getAudioUrl.ts
│       ├── getImage.ts
│       └── songHelpers.ts
├── App.tsx                     # App entry point
├── index.ts                    # Root entry
└── package.json
```

### Key Architectural Patterns

#### 1. State Management (Zustand)

```typescript
// Centralized store in src/store/songStore.ts
interface SongState {
  songs: Song[]; // Current song list
  currentSong: Song | null; // Now playing
  isPlaying: boolean; // Playback state
  queue: Song[]; // Queue management
  recentlyPlayed: Song[]; // History
  // ... actions
}
```

**Features:**

- Global state for player, songs, and queue
- AsyncStorage integration for persistence
- Actions for play, pause, skip, queue management

#### 2. Navigation Structure

```
BottomTabs (Main)
├── Home (Stack)
│   ├── HomeMain
│   ├── Player (Modal)
│   ├── Queue
│   ├── Search
│   ├── ArtistDetail
│   ├── ArtistsList
│   └── SongList
├── Favorites
├── Playlists
└── Settings
```

**Custom Tab Bar:**

- Floating mini player above tabs
- Hides on Player screen
- Gesture-friendly design

#### 3. Component Patterns

**SongRow Component:**

- Reusable song list item
- 3-dot menu for actions
- Modal-based menu UI
- Play/pause state indication

**MiniPlayer:**

- Floating above content
- Absolute positioning with shadow
- Tap to open full player
- Shows current song and controls

#### 4. Theme System

```typescript
ThemeContext provides:
- Light/Dark/System modes
- System theme detection
- Persistent theme selection
- Dynamic color values
```

#### 5. API Integration (Saavn)

Base URL: `https://saavn.sumit.co/api`

**Endpoints:**

- `searchSongs` - Search songs
- `searchArtists` - Search artists
- `getSongById` - Get song details
- `getArtistById` - Get artist info
- `getArtistSongs` - Get artist's songs
- `getSongSuggestions` - Get related songs

#### 6. Audio Playback (Expo AV)

```typescript
// Wrapper in src/audio/audioService.ts
-playSound(url) -
  pauseSound() -
  resumeSound() -
  seekTo(position) -
  setOnPlaybackStatusUpdate(callback);
```

**Features:**

- Single audio instance management
- Playback status updates
- Auto-play next on finish
- Position tracking

#### 7. Data Flow

```
User Action → Component → Store Action → API (if needed)
                              ↓
                         Update State
                              ↓
                      Persist to Storage
                              ↓
                    Re-render Components
```

**Example: Playing a song**

1. User taps SongRow
2. Calls `setCurrentSong(song)`
3. Store fetches audio URL
4. Loads audio with expo-av
5. Updates state (isPlaying: true)
6. Saves to AsyncStorage
7. UI updates (mini player, player screen)

#### 8. Persistence Strategy

**AsyncStorage Keys:**

- `lastPlayedSong` - Last played song and index
- `recentlyPlayed` - Array of recent songs (max 10)
- `queue` - Current queue
- App hydrates on startup

## Key Features Implementation

### Queue System

- Simple add/remove operations
- No drag-and-drop complexity
- Plays queue first, then song list
- Persisted locally
- Modal menu for adding songs

### Search

- 500ms debounce
- Real-time results
- Updates store for playback
- Clean empty state

### Theme Switching

- Light/Dark/System modes
- OS-level detection with `useColorScheme`
- Persisted selection
- Smooth transitions

### Mini Player

- Floating design with shadow
- Positioned 60px above tabs
- Rounded corners
- Tap to expand
- Auto-hide on Player screen

## Styling Conventions

Using **twrnc** (Tailwind CSS):

```typescript
// Inline styles with theme
style={[
  tw`flex-row items-center px-4`,
  { backgroundColor: theme.card }
]}

// Common patterns
tw`text-lg font-bold`          // Typography
tw`px-4 py-3`                  // Spacing
tw`rounded-lg shadow-md`       // Visual effects
tw`flex-1`                     // Flex layout
```

## Development Guidelines

### Adding a New Screen

1. Create screen component in `src/screens/[Category]/`
2. Add route type in `src/navigation/types.ts`
3. Register in navigator (`BottomTabs.tsx` or stack)
4. Use theme context for colors
5. Follow naming convention: `[Name]Screen.tsx`

### Adding a New Feature to Store

1. Add state property to interface
2. Initialize in store creation
3. Create actions to modify state
4. Add persistence if needed
5. Export for component use

### Working with API

1. Add endpoint function in `src/api/saavn.ts`
2. Use TypeScript interfaces for responses
3. Handle loading and error states
4. Update store if needed for playback

## Troubleshooting

### Common Issues

**Metro bundler issues:**

```bash
npx expo start -c
```

**Build errors:**

```bash
npx expo prebuild --clean
npx expo run:android
```

**Audio not playing:**

- Check internet connection
- Verify Saavn API is accessible
- Check audio URL extraction

**State not persisting:**

- Verify AsyncStorage is installed
- Check hydration functions are called
- Clear app data and restart

## Future Enhancements

- [ ] Favorites/Like functionality
- [ ] Playlists management
- [ ] Download for offline playback
- [ ] Lyrics display
- [ ] Social sharing
- [ ] Music recommendations
- [ ] Crossfade between songs
- [ ] Sleep timer
- [ ] Equalizer

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Saavn API for music streaming
- Expo team for excellent development tools
- React Navigation for routing solution
- All open-source contributors

---

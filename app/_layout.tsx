import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DefaultTheme as NavDefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useContext, useEffect} from 'react';
import 'react-native-reanimated';
import {MD3LightTheme as PaperDefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import Toast from "react-native-toast-message";
import {toastConfig} from "@/components/UI/toastConfig";
import {AuthContext, AuthProvider} from "@/context/AuthContext";
import {ActivityIndicator, View} from "react-native";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

// Tùy chỉnh theme paper
const paperTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#3B82F6', // đổi màu chủ đạo cho app
  },
};

function AuthGate({ children }: { children: React.ReactNode }) {
    // @ts-ignore
    const { isRefreshing } = useContext(AuthContext);

    if (isRefreshing) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return <>{children}</>;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });


  useEffect(() => { if (error) throw error; }, [error]);
  useEffect(() => { if (loaded) SplashScreen.hideAsync(); }, [loaded]);

  if (!loaded) return null;

  return (
      <AuthProvider>
          <AuthGate>
            <RootLayoutNav />
          </AuthGate>
      </AuthProvider>
  );
}

function RootLayoutNav() {
  // @ts-ignore
  return (
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={NavDefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
          </Stack>
            <Toast config={toastConfig}/>
        </ThemeProvider>
      </PaperProvider>
  );
}


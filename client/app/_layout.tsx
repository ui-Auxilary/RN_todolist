import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { registerSheet, SheetDefinition } from 'react-native-actions-sheet';
import ViewTodo from '@/components/ViewTodo';
import EditTodo from '@/components/EditTodo';
import { TodoProvider } from '@/hooks/TodoContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    registerSheet('view-sheet', ViewTodo);
    registerSheet('edit-sheet', EditTodo);
  }, []);

  return (
    <TodoProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
      </ThemeProvider>
    </TodoProvider>
  );
}

declare module 'react-native-actions-sheet' {
  interface Sheets {
    'view-sheet': SheetDefinition<{
      payload: {
        id: string;
        title: string;
        description: string;
        photo: string;
        tagIDs: string[];
        important: boolean;
      };
    }>;
  }
}

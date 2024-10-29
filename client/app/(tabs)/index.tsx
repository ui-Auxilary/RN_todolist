import { SheetProvider } from 'react-native-actions-sheet';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import Todo from '@/pages/Todo';
import Create from '@/pages/Create';

const Stack = createStackNavigator();

export default function HomePage() {
  return (
    <SheetProvider>
      <Stack.Navigator>
        <Stack.Screen
          name='todo'
          component={Todo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='create'
          component={Create}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
      </Stack.Navigator>
    </SheetProvider>
  );
}

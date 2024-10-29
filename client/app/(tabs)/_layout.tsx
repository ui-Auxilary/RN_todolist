import { Tabs } from 'expo-router';
import React, { useEffect, useState } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='index'
        initialParams={{ newTodo: false }}
        options={{
          title: 'Todo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'list' : 'list-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='completed'
        options={{
          title: 'Completed',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'checkmark-circle' : 'checkmark-circle-outline'}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

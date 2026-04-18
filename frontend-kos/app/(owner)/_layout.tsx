import { Tabs } from 'expo-router';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function OwnerTabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4f46e5',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? 'rgba(2, 6, 23, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          position: 'absolute',
          borderTopWidth: 1,
          borderTopColor: 'rgba(99, 102, 241, 0.1)',
          elevation: 0,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter',
          fontSize: 11,
          fontWeight: '600',
          textTransform: 'uppercase',
          marginTop: 4,
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="dashboard" color={color} />,
        }}
      />
      <Tabs.Screen
        name="branches"
        options={{
          title: 'Branches',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="location-city" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="assessment" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="person" color={color} />,
        }}
      />
    </Tabs>
  );
}

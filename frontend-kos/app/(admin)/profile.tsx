import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { globalState } from '../_globalState';
import { useRouter } from 'expo-router';

export default function AdminProfileScreen() {
  const router = useRouter();
  const adminEmail = globalState.email || 'admin@estate.com';

  const handleLogout = () => {
    globalState.token = '';
    globalState.email = '';
    globalState.role = '';
    router.replace('/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4">
      <View className="px-6 py-8 items-center">
        <View className="w-24 h-24 rounded-full bg-primary-container items-center justify-center mb-4 border-4 border-surface shadow-sm">
          <Text className="text-3xl font-black text-on-primary-container">
            {adminEmail[0].toUpperCase()}
          </Text>
        </View>
        <Text className="text-2xl font-black text-on-surface mb-1">Estate Admin</Text>
        <Text className="text-on-surface-variant mb-8">{adminEmail}</Text>

        <View className="w-full bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/10">
          <TouchableOpacity 
            onPress={() => router.push('/notifications' as any)}
            className="flex-row items-center justify-between py-4 border-b border-outline-variant/10"
          >
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="notifications" size={24} color="#3525cd" />
              <Text className="font-semibold text-on-surface">Notifications</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#777587" />
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between py-4 border-b border-outline-variant/10">
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="settings" size={24} color="#464555" />
              <Text className="font-semibold text-on-surface">Account Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#777587" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="flex-row items-center justify-between py-4"
          >
            <View className="flex-row items-center gap-3">
              <MaterialIcons name="logout" size={24} color="#ba1a1a" />
              <Text className="font-semibold text-[#ba1a1a]">Logout</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#ba1a1a" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

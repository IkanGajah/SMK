import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/config';

import { globalState } from '../_globalState';

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = React.useState({
    nama: globalState.namaLengkap || (globalState.email ? globalState.email.split('@')[0] : 'User'),
    email: globalState.email || 'user@example.com',
    foto: ''
  });

  React.useEffect(() => {
    // Attempt to fetch profile from DB
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/penyewa/profil`, {
          headers: {
            'Authorization': `Bearer ${globalState.token}`
          }
        });
        const json = await res.json();
        if (json.data) {
          const newName = json.data.nama || globalState.namaLengkap || globalState.email.split('@')[0];
          const newFoto = json.data.foto || '';

          globalState.namaLengkap = newName;
          globalState.foto = newFoto;

          setProfile({
            nama: newName,
            email: json.data.email || globalState.email,
            foto: newFoto
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    if (globalState.token) {
      fetchProfile();
    }
  }, []);

  const handleAction = (actionName: string) => {
    Alert.alert("Fitur", `Fitur ${actionName} sedang dalam pengembangan.`);
  };

  const handleLogout = () => {
    Alert.alert(
      "Konfirmasi Logout",
      "Apakah Anda yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            router.replace('/login' as any);
          }
        }
      ]
    );
  };

  const userInitials = profile.nama.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>

      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-4">
          {profile.foto ? (
            <Image
              source={{ uri: profile.foto }}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-primary-container items-center justify-center border border-outline-variant/30">
              <Text className="text-on-primary-container font-bold text-xs">{userInitials}</Text>
            </View>
          )}
          <Text className="text-primary font-black text-2xl tracking-tight">My Profile Gueh</Text>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/notifications' as any)}
          className="hover:opacity-80 active:scale-95"
        >
          <MaterialIcons name="notifications" size={24} color="#777587" />
          <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-surface" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Space for Bottom Nav
        className="px-6 mt-8"
      >

        {/* Profile Header Section */}
        <View className="items-center mb-12">
          <View className="relative mb-6">
            {profile.foto ? (
              <Image
                source={{ uri: profile.foto }}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-surface-container-lowest"
              />
            ) : (
              <View className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary-container items-center justify-center shadow-lg border-4 border-surface-container-lowest">
                <Text className="text-on-primary-container font-black text-4xl">{userInitials}</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => handleAction('Ubah Foto')} className="absolute bottom-0 right-0 bg-primary w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-95">
              <MaterialIcons name="edit" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="font-black text-3xl text-on-surface mb-2">{profile.nama}</Text>
          <Text className="text-on-surface-variant text-lg">{profile.email}</Text>
        </View>

        {/* Settings List */}
        <View className="bg-surface-container-lowest rounded-2xl p-2 mb-8 shadow-sm">

          <TouchableOpacity onPress={() => handleAction('Edit Profile')} className="flex-row items-center justify-between p-4 rounded-xl active:bg-surface-container-low mb-1">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <MaterialIcons name="person" size={22} color="#3525cd" />
              </View>
              <Text className="font-medium text-lg text-on-surface">Edit Profile</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#777587" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleAction('Contact Admin')} className="flex-row items-center justify-between p-4 rounded-xl active:bg-surface-container-low mb-1">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <MaterialIcons name="support-agent" size={22} color="#3525cd" />
              </View>
              <Text className="font-medium text-lg text-on-surface">Contact Admin</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#777587" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleAction('Bantuan')} className="flex-row items-center justify-between p-4 rounded-xl active:bg-surface-container-low">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <MaterialIcons name="help" size={22} color="#3525cd" />
              </View>
              <Text className="font-medium text-lg text-on-surface">Help</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#777587" />
          </TouchableOpacity>

        </View>

        {/* Logout Button */}
        <View className="flex items-center">
          <TouchableOpacity
            onPress={handleLogout}
            className="w-full py-4 bg-[#ffdad6] rounded-xl active:scale-95 flex-row items-center justify-center gap-2"
          >
            <MaterialIcons name="logout" size={22} color="#ba1a1a" />
            <Text className="font-medium text-lg text-[#ba1a1a]">Logout</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

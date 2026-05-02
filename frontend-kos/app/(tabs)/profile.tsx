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

import { globalState } from '../_globalState';

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = React.useState({
    nama: globalState.email ? globalState.email.split('@')[0] : 'Budi Santoso',
    email: globalState.email || 'budi.s@example.com'
  });

  React.useEffect(() => {
    // Attempt to fetch profile from DB
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://192.168.1.7:8080/api/penyewa/profil`, {
          headers: {
            'Authorization': `Bearer ${globalState.token}`
          }
        });
        const json = await res.json();
        if (json.data) {
          setProfile({
            nama: json.data.nama || globalState.email.split('@')[0],
            email: json.data.email || globalState.email
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

  const PROFILE_PIC = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs86UYiYKBOf2Hldgtj6i6HPWS5sEtMRwnwLKXJMKb7bWEW6EEgiIc3fVpCYSbj8H7xXOPoOB8IZBchj0JTVJOcit4iAm11Lkb0PzLbA7wRfDdIc-6R1MX6V_K89RI6fqrU8T5NTd5IVF_89xVwN9JMKuCsXsagD25KXhsbu0XcvRtAPlFDKEKlqWqlciZHOoruKr5qmoRcWukGIKWVIqIuv3DuIislJObU19o6FnbBV4RUdKo1L4AvJhJq6B6KWli0JW8QoPUuz0';

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-4">
          <Image 
            source={{ uri: PROFILE_PIC }}
            className="w-10 h-10 rounded-full object-cover"
          />
          <Text className="text-primary font-black text-2xl tracking-tight">The Estate</Text>
        </View>

        <TouchableOpacity onPress={() => handleAction('Notifikasi')} className="hover:opacity-80 active:scale-95">
          <MaterialIcons name="notifications" size={24} color="#777587" />
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
            <Image 
              source={{ uri: PROFILE_PIC }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-lg border-4 border-surface-container-lowest"
            />
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

          <TouchableOpacity onPress={() => handleAction('Notifikasi Preferensi')} className="flex-row items-center justify-between p-4 rounded-xl active:bg-surface-container-low mb-1">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center">
                <MaterialIcons name="notifications-active" size={22} color="#3525cd" />
              </View>
              <Text className="font-medium text-lg text-on-surface">Notifications</Text>
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

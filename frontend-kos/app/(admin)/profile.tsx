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

export default function AdminProfileScreen() {
  const router = useRouter();

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
            router.replace('/');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-4">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-QOLuQcyB3qq4LOXq_XpyjC4-KY4_qB88rawLA4BM3LlCHW84fM_qnvLfrIOn6JfvTmJNp4TVie31WeBwl_rCCxUD9chphnLjIdZkTkV5TrcVDAS6GN3-4O4L-OxAnXDPmGWv-9KU1aIGhc3iKSSGmew3U8bUQ7SeLW-M_UeQDwQtrI1CGNZUcUnBju9gCdDbCywVugDIvna74g4mi9gL2NfYa1u9nlUqqAV1sVimdUCgu1i7Gq1akutfIO1gtcAsgd4OGFba1cE' }}
            className="w-10 h-10 rounded-full border-2 border-surface-container-low"
          />
          <Text className="text-primary font-black text-2xl tracking-tight">The Estate Admin</Text>
        </View>
        <TouchableOpacity 
          onPress={() => Alert.alert("Notifikasi Admin", "Tidak ada pemberitahuan baru.")}
          className="hover:opacity-80 active:scale-95"
        >
          <MaterialIcons name="notifications" size={24} color="#777587" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        className="px-6 mt-8"
      >
        {/* Profile Header */}
        <View className="items-center mb-12">
          <View className="relative mb-6">
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-QOLuQcyB3qq4LOXq_XpyjC4-KY4_qB88rawLA4BM3LlCHW84fM_qnvLfrIOn6JfvTmJNp4TVie31WeBwl_rCCxUD9chphnLjIdZkTkV5TrcVDAS6GN3-4O4L-OxAnXDPmGWv-9KU1aIGhc3iKSSGmew3U8bUQ7SeLW-M_UeQDwQtrI1CGNZUcUnBju9gCdDbCywVugDIvna74g4mi9gL2NfYa1u9nlUqqAV1sVimdUCgu1i7Gq1akutfIO1gtcAsgd4OGFba1cE' }}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-surface-container-lowest"
            />
            <TouchableOpacity 
              onPress={() => Alert.alert("Edit Foto", "Fitur ubah foto profil admin segera hadir.")}
              className="absolute bottom-0 right-0 bg-indigo-600 w-10 h-10 rounded-full flex items-center justify-center shadow-lg active:scale-95"
            >
              <MaterialIcons name="edit" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text className="font-black text-3xl text-on-surface mb-2">Admin Utama</Text>
          <Text className="text-on-surface-variant text-lg">admin@kosku.com</Text>
          <View className="mt-3 px-3 py-1 bg-indigo-100 rounded-full">
            <Text className="text-xs font-bold text-indigo-700 tracking-wider uppercase">Super Admin</Text>
          </View>
        </View>

        {/* Settings List */}
        <View className="bg-surface-container-lowest rounded-2xl p-2 mb-8 shadow-sm border border-outline-variant/10">
          
          <TouchableOpacity 
            onPress={() => Alert.alert("Pengaturan Akun", "Halaman konfigurasi akun admin sedang disiapkan.")}
            className="flex-row items-center justify-between p-4 rounded-xl active:bg-surface-container-low mb-1"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <MaterialIcons name="manage-accounts" size={22} color="#4f46e5" />
              </View>
              <Text className="font-medium text-lg text-on-surface">Account Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#777587" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={() => Alert.alert("Pengaturan Sistem", "Akses menu sistem dibatasi saat ini.")}
            className="flex-row items-center justify-between p-4 rounded-xl active:bg-surface-container-low mb-1"
          >
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
                <MaterialIcons name="settings-system-daydream" size={22} color="#4f46e5" />
              </View>
              <Text className="font-medium text-lg text-on-surface">System Preferences</Text>
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
            <Text className="font-medium text-lg text-[#ba1a1a]">Logout Admin</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

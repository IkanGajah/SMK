import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SecureStore from 'expo-secure-store';

export default function AddRoomScreen() {
  const router = useRouter();
  
  // State form
  const [roomName, setRoomName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!roomName || !price || !details) {
      Alert.alert("Error", "Semua kolom wajib diisi!");
      return;
    }

    setIsLoading(true);

    try {
      const token = await SecureStore.getItemAsync('userToken');

      const response = await fetch('http://10.1.13.53:8080/api/kamar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          nomorKamar: roomName,
          harga: parseInt(price, 10),
          fasilitas: details,
          status: 'Available'
        })
      });

      setIsLoading(false);

      if (response.ok) {
        Alert.alert(
          "Sukses", 
          `Kamar ${roomName} berhasil ditambahkan ke database!`,
          [{ text: "OK", onPress: () => router.back() }]
        );
      } else {
        const errorData = await response.json();
        Alert.alert("Gagal", errorData.message || "Gagal menambahkan kamar.");
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      Alert.alert("Error", "Gagal menghubungi server. Pastikan backend berjalan di 10.1.13.53:8080");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      
      {/* App Bar */}
      <View className="px-6 py-4 flex-row items-center gap-4 bg-surface-container-lowest shadow-sm z-50">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full bg-surface-container-highest active:scale-95"
        >
          <MaterialIcons name="arrow-back" size={24} color="#191c1e" />
        </TouchableOpacity>
        <Text className="font-black text-xl text-on-surface tracking-tight">Tambah Kamar Baru</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          className="flex-1 px-6 mt-6"
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          
          <View className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/10">
            <Text className="font-bold text-lg text-on-surface mb-6">Informasi Kamar</Text>

            {/* Nama Kamar */}
            <View className="mb-5">
              <Text className="text-sm font-medium text-on-surface-variant mb-2">Nama / Nomor Kamar</Text>
              <TextInput
                className="w-full px-4 py-3 bg-surface-container-highest rounded-xl text-on-surface h-[50px]"
                placeholder="Contoh: Kamar 101, Suite A"
                placeholderTextColor="#777587"
                value={roomName}
                onChangeText={setRoomName}
              />
            </View>

            {/* Harga */}
            <View className="mb-5">
              <Text className="text-sm font-medium text-on-surface-variant mb-2">Harga Sewa per Bulan</Text>
              <View className="relative justify-center">
                <View className="absolute left-4 z-10">
                  <Text className="font-bold text-on-surface-variant">Rp</Text>
                </View>
                <TextInput
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-highest rounded-xl text-on-surface h-[50px]"
                  placeholder="Contoh: 1500000"
                  placeholderTextColor="#777587"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
            </View>

            {/* Detail / Fasilitas */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-on-surface-variant mb-2">Detail & Fasilitas</Text>
              <TextInput
                className="w-full px-4 py-3 bg-surface-container-highest rounded-xl text-on-surface min-h-[100px]"
                placeholder="Contoh: AC, WiFi, Kamar Mandi Dalam..."
                placeholderTextColor="#777587"
                multiline
                textAlignVertical="top"
                value={details}
                onChangeText={setDetails}
              />
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity 
                onPress={() => router.back()}
                className="flex-1 py-3.5 rounded-xl bg-surface-container items-center justify-center active:scale-95"
              >
                <Text className="font-bold text-on-surface">Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleSave}
                disabled={isLoading}
                className="flex-1 rounded-xl overflow-hidden shadow-sm active:scale-95"
              >
                <LinearGradient
                  colors={['#4f46e5', '#3525cd']}
                  className="w-full h-full py-3.5 items-center justify-center"
                >
                  <Text className="font-bold text-white">
                    {isLoading ? 'Menyimpan...' : 'Simpan Kamar'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React, { useState, useEffect } from 'react';
import { Kamar } from '@/types/types';
import { Text, View, FlatList, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const [kamar, setKamar] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //ganti berdasarkan IP laptop saat ini
  const API_URL = 'http://10.1.13.53:8080/api/kamar'; 

  useEffect(() => {
    fetchKamar();
  }, []);

  const fetchKamar = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setKamar(json.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      alert("Gagal menyambung ke server. Pastikan Spring Boot menyala!");
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Kamar }) => (
    <TouchableOpacity 
      onPress={() => router.push(`/kamar/${item.id}` as any)}
      activeOpacity={0.7}
      className="bg-white p-4 rounded-xl mb-3 shadow-sm border border-gray-100"
    >
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-slate-800">Kamar {item.nomorKamar}</Text>
        
        <View className={`px-3 py-1 rounded-full ${item.status === 'Tersedia' ? 'bg-green-100' : 'bg-red-100'}`}>
          <Text className={`text-xs font-bold ${item.status === 'Tersedia' ? 'text-green-800' : 'text-red-800'}`}>
            {item.status}
          </Text>
        </View>

      </View>
      <Text className="text-sm text-slate-500 mb-2">Fasilitas: {item.fasilitas}</Text>
      <Text className="text-base font-extrabold text-blue-600">
        Rp {item.harga.toLocaleString('id-ID')} <Text className="text-sm font-normal text-slate-500">/ bulan</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header */}
      <View className="p-5 bg-white border-b border-gray-200">
        <Text className="text-2xl font-black text-slate-900">Daftar Kamar</Text>
      </View>

      {/* Konten Utama */}
      {loading ? (
        <ActivityIndicator size="large" color="#2563eb" className="mt-10" />
      ) : (
        <FlatList
          data={kamar}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </SafeAreaView>
  );
}
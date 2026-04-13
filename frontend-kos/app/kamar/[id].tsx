import React, { useState, useEffect } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Kamar } from '@/types/types';

export default function DetailKamarScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const [kamar, setKamar] = useState<Kamar | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Ganti IP jangan lupa le
  const API_URL = `http://10.1.13.53:8080/api/kamar/${id}`; 

  useEffect(() => {
    fetchDetailKamar();
  }, [id]);

  const fetchDetailKamar = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      setKamar(json.data);
    } catch (error) {
      console.error(error);
      alert("Gagal mengambil detail kamar dari server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <SafeAreaView className="flex-1 bg-slate-50 p-5">
      {/* Ilangin header bawaan */}
      <Stack.Screen options={{ headerShown: false }} /> 

      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Tombol Kembali */}
      <TouchableOpacity 
        onPress={() => router.back()} 
        className="mb-6 flex-row items-center"
      >
        <Text className="text-blue-600 font-bold text-base">← Kembali ke Daftar</Text>
      </TouchableOpacity>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563eb" />
          <Text className="mt-4 text-slate-500">Mencari data kamar...</Text>
        </View>
      ) : kamar ? (
        <View>
          <Text className="text-3xl font-black text-slate-900 mb-6">
            Detail Kamar {kamar.nomorKamar}
          </Text>

          {/* Kartu Info Detail */}
          <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            
            <View className="mb-4">
              <Text className="text-xs text-slate-400 font-bold uppercase mb-1">Status</Text>
              <View className={`self-start px-3 py-1 rounded-full ${kamar.status === 'Tersedia' ? 'bg-green-100' : 'bg-red-100'}`}>
                <Text className={`text-sm font-bold ${kamar.status === 'Tersedia' ? 'text-green-800' : 'text-red-800'}`}>
                  {kamar.status}
                </Text>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-xs text-slate-400 font-bold uppercase mb-1">Fasilitas</Text>
              <Text className="text-base text-slate-700">{kamar.fasilitas}</Text>
            </View>

            <View className="mb-6">
              <Text className="text-xs text-slate-400 font-bold uppercase mb-1">Harga Sewa</Text>
              <Text className="text-2xl font-extrabold text-blue-600">
                Rp {kamar.harga.toLocaleString('id-ID')} <Text className="text-base font-normal text-slate-500">/ bulan</Text>
              </Text>
            </View>

            {kamar.status !== 'Tersedia' && (
              <View className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
                <View className="mb-3">
                  <Text className="text-xs text-slate-400 font-bold uppercase mb-1">Disewa Oleh</Text>
                  <Text className="text-base font-bold text-slate-800">
                    {kamar.namaPenyewa ? kamar.namaPenyewa : "Data tidak tersedia"}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-slate-400 font-bold uppercase mb-1">Jatuh Tempo Bayar</Text>
                  <Text className="text-base font-bold text-red-600">
                    {kamar.tempoBayar ? kamar.tempoBayar : "-"}
                  </Text>
                </View>
              </View>
            )}

            {/* Tombol Aksi (Hanya muncul jika statusnya Tersedia) */}
            {kamar.status === 'Tersedia' ? (
              <TouchableOpacity className="bg-blue-600 py-3 rounded-xl items-center">
                <Text className="text-white font-bold text-lg">Sewa Kamar Ini</Text>
              </TouchableOpacity>
            ) : (
              <View className="bg-slate-200 py-3 rounded-xl items-center">
                <Text className="text-slate-500 font-bold text-lg">Kamar Tidak Tersedia</Text>
              </View>
            )}

          </View>
        </View>
      ) : (
        <Text className="text-center text-red-500 mt-10">Data kamar tidak ditemukan!</Text>
      )}
    </SafeAreaView>
  );
}
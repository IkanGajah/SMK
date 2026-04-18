import React, { useState, useEffect } from 'react';
import { Kamar } from '@/types/types';
import { Text, View, FlatList, ActivityIndicator, StatusBar, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Mock images for the beautiful UI representation
const MOCK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_mNMZzsNd1vBAjCWoZs71R2hGuTlqVV1DZVZ6cwAq3GpjALdVkQcgURnFJfkzM0xjtRPq_isN71KWFFUv1P-C50j-iPO1nw72I8YyuL53OyPmbjCuCYl5K8p3E2i0UywlhkDqoMmXLbCOnG5kF9itawmqX1zxKHnk2TMQD_putTtfdUr1JnDgmJewB5-dhgWsm3FA7EhM5vIHlhTQo5eSw-TVI4EVWRapJAYqsHyAoiFIHU0G9DnffQb0ZRKSeMCjV5Txe7tu6Lo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBOA4dudwRH3LLMs3f3T9v-Rehy3vsWcmjoLx_3I5dPIAwssFPBcGGOvAU8Kb7lZTukT8icr5H_hwZrNQOvSM53bqKsW5cahZyMrrjEFZTFATkU7uwWFUz4V1LCjsywcaqH6CCZBDiDNbqNl09EdTf4zkZ35HDTDywsgnUoyuwDxVhCzrOMVdOVgAWB4_m6ZlZdb0XXeAx5Z_BYcgR4tKnS2kZa3M8Nuv5diNOngqbKbmsfBJFKrD1CiLMTz72w6qSeWAUjErw_iuI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDraX6DZHUWRTz7hcoqe2gGxwGZcS_MyKAXR3vQCjAZcj41hjEqcco82RcJoWlHYXlNLNI2SlypPsC81LAAIPomLF09yhCzPvmRZrDkU-BbQthxYSLK5g9K3xA-wkBYVJ3Gq6Fk9rqBWt9Cw4U_U1299TzZJBYmarD2GKB32yMUv9aGKXC0oP5XHum-zk_szzW28xHuUmYRVhD6ANgLf66rLgaLcO89UUISHOjfJKiTkmnCYBF3ECIACKTgtDGitqSl7aAeCAU10EM"
];

// Fallback data if API fails to load so we can still see the UI
const FALLBACK_DATA: Kamar[] = [
  { id: 1, nomorKamar: "101", status: "Tersedia", fasilitas: "AC, WiFi, KM Dalam, Lemari, Meja Belajar, Kasur Queen Size", harga: 1200000 },
  { id: 2, nomorKamar: "102", status: "Tersedia", fasilitas: "Kipas Angin, KM Luar, Lemari, Meja Belajar", harga: 800000 },
  { id: 3, nomorKamar: "201", status: "Penuh", fasilitas: "AC, WiFi, KM Dalam, Balkon Pribadi", harga: 1500000 },
];

export default function HomeScreen() {
  const router = useRouter();
  const [kamar, setKamar] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Ganti berdasarkan IP laptop saat ini
  const API_URL = 'http://192.168.1.10:8080/api/kamar'; 

  useEffect(() => {
    fetchKamar();
  }, []);

  const fetchKamar = async () => {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      if (json.data && json.data.length > 0) {
        setKamar(json.data);
      } else {
        setKamar(FALLBACK_DATA);
      }
    } catch (error) {
      console.error("Error fetching data, using fallback: ", error);
      setKamar(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item, index }: { item: Kamar, index: number }) => {
    const isAvailable = item.status === 'Tersedia';
    const imageUrl = MOCK_IMAGES[index % MOCK_IMAGES.length];
    
    return (
      <TouchableOpacity 
        onPress={() => router.push(`/kamar/${item.id}` as any)}
        activeOpacity={0.8}
        className={`bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm mb-6 mx-4 ${!isAvailable ? 'opacity-80' : ''}`}
        style={
          Platform.OS === 'android' ? { elevation: 2 } : {
            shadowColor: '#3525cd',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.05,
            shadowRadius: 12,
          }
        }
      >
        <View className="relative h-48 w-full bg-surface-container-highest">
          <Image 
            source={{ uri: imageUrl }} 
            className={`w-full h-full ${!isAvailable ? 'opacity-70' : ''}`}
            resizeMode="cover"
            style={!isAvailable ? { tintColor: 'gray' } : {}}
          />
          {/* Status Badge */}
          <View className={`absolute top-4 left-4 flex-row items-center px-3 py-1.5 rounded-full ${isAvailable ? 'bg-secondary-container/95' : 'bg-surface-variant/95'}`}>
            <MaterialIcons 
              name={isAvailable ? "check-circle" : "event-busy"} 
              size={14} 
              color={isAvailable ? "#006f64" : "#464555"} 
            />
            <Text className={`font-bold text-xs ml-1 ${isAvailable ? 'text-on-secondary-container' : 'text-on-surface-variant'}`}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <View className="p-5 flex-col justify-between">
          <View>
            <View className="flex-row justify-between items-start mb-2">
              <Text className="font-bold text-xl text-on-surface">Kamar {item.nomorKamar}</Text>
              <View className="flex-row items-center">
                <MaterialIcons name="star" size={16} color="#777587" />
                <Text className="text-outline text-sm ml-1 font-medium">{isAvailable ? '4.8' : '4.5'}</Text>
              </View>
            </View>
            
            <Text className="text-on-surface-variant mb-4 text-sm leading-5" numberOfLines={2}>
              {item.fasilitas}
            </Text>
          </View>
          
          <View className="mt-2 pt-4 border-t border-outline-variant/30 flex-row justify-between items-end">
            <View>
              <Text className="text-xs text-outline mb-1 font-medium">Harga Sewa</Text>
              <Text className="font-extrabold text-xl text-on-surface">
                Rp {item.harga.toLocaleString('id-ID')} <Text className="text-sm font-medium text-on-surface-variant">/bulan</Text>
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#f7f9fb" />
      
      {/* Top App Bar */}
      <View className="flex-row justify-between items-center px-6 py-4 bg-surface/90 z-50 border-b border-surface-container-highest">
        <View className="flex-row items-center">
          <MaterialIcons name="domain" size={28} color="#3525cd" />
          <Text className="font-black text-2xl text-primary ml-2 tracking-tight">KosKu</Text>
        </View>
        <TouchableOpacity className="bg-primary px-6 py-2.5 rounded-xl shadow-sm">
          <Text className="text-on-primary font-bold text-sm">Login</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={kamar}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
        ListHeaderComponent={
          <View className="pt-6 pb-2">
            {/* Search Input */}
            <View className="relative w-full mb-6 px-4">
              <View className="absolute left-8 top-3.5 z-10">
                <MaterialIcons name="search" size={22} color="#777587" />
              </View>
              <TextInput
                className="w-full bg-surface-container-highest border border-outline-variant/50 rounded-xl h-[50px] pl-12 pr-4 text-on-surface font-medium text-base"
                placeholder="Cari kamar..."
                placeholderTextColor="#777587"
              />
            </View>

            {/* Filter Chips */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              className="flex-row px-4 mb-6" 
              contentContainerStyle={{ paddingRight: 32 }}
            >
              <TouchableOpacity className="bg-primary-container px-6 py-2.5 rounded-full mr-3 shadow-sm">
                <Text className="text-on-primary-container font-semibold text-sm">Semua</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-surface-container-highest px-5 py-2.5 rounded-full mr-3 border border-outline-variant/20">
                <Text className="text-on-surface-variant font-medium text-sm">Tersedia</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-surface-container-highest px-5 py-2.5 rounded-full mr-3 border border-outline-variant/20">
                <Text className="text-on-surface-variant font-medium text-sm">&lt; 1jt</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-surface-container-highest px-5 py-2.5 rounded-full mr-3 border border-outline-variant/20">
                <Text className="text-on-surface-variant font-medium text-sm">AC</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-surface-container-highest px-5 py-2.5 rounded-full mr-3 border border-outline-variant/20">
                <Text className="text-on-surface-variant font-medium text-sm">KM Dalam</Text>
              </TouchableOpacity>
            </ScrollView>
            
            {loading && (
              <ActivityIndicator size="large" color="#3525cd" className="mt-10" />
            )}
          </View>
        }
      />
    </SafeAreaView>
  );
}
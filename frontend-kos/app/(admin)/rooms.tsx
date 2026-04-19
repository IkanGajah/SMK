import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useFocusEffect } from 'expo-router';

// Fallback image since backend doesn't have image field yet
const FALLBACK_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsiOEr6jpsbQ-59R08kDaVoD3YkJY71p-xL9DkOhw1rpnhQ0jITL192xH6rcKJDl00-XzNLEXJHzjvQFC3wjRB2uQe4JEGJ-yqcCYrvuOI4hSbT_vBa9ibBlp-m94dvEs2ewzIuQcgR1YIvc1-y5ZvSTmsKeyaMSAZBwOqnBiKQ_T5ZNWkA-HNtx-i9j26g85D8onp9qeG3Bbx21R-3x7CGQAJaqMpCUTy2qbTTB1T3UKuXDuWb77cD8vQ-FKwp3MAQPT_H5KLDA';

export let ROOMS_DATA: any[] = [
  {
    id: 'r1',
    nomorKamar: 'Suite 402',
    harga: 1850000,
    fasilitas: '1 Bed • 1 Bath • 750 sqft',
    status: 'Available',
    image: FALLBACK_IMAGE,
    tenant: null
  },
  {
    id: 'r2',
    nomorKamar: 'Apt 215',
    harga: 2100000,
    fasilitas: '2 Bed • 2 Bath • 1100 sqft',
    status: 'Occupied',
    image: FALLBACK_IMAGE,
    tenant: { initials: 'JD', name: 'John Doe' }
  }
];

export default function AdminRoomsScreen() {
  const router = useRouter();
  const [roomsList, setRoomsList] = useState<any[]>([]);

  const fetchRooms = async () => {
    try {
      const response = await fetch('http://10.1.13.53:8080/api/kamar');
      
      if (!response.ok) {
        throw new Error('Server error');
      }

      const json = await response.json();
      if (json.data && json.data.length > 0) {
        // Balik array agar kamar terbaru di atas (opsional, tergantung urutan DB)
        setRoomsList(json.data.reverse());
      } else {
        // Jika API berhasil tapi datanya kosong, gunakan fallback data dummy
        setRoomsList([...ROOMS_DATA]);
      }
    } catch (error) {
      console.error("Gagal menarik data kamar, menggunakan data dummy:", error);
      setRoomsList([...ROOMS_DATA]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRooms();
    }, [])
  );
  
  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-3">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVPnsPIZzwE8nf_8xfuKLwsce8P-DxQi6iN0As8L59n9eOUh4DGgjSbTLOVA-CvJoDwyvAwCKA6NlrP9LSYaebg2uSTSF74s4cb6urKA_mA7ln95HKslEVdUaexVT-lPiGk5j4TMUdXuwg5iX8vKN_KhxYsa1Ba3tXkxLITfhowpEWr3IiulDBAqejWRAcsACo2xpft0wWXyIvjaYvy4WpXQcnDJo2Qe0W51hTTagK2U525s1irzWSpOLS-pf-TcgEdY3Ta46hME' }}
            className="w-10 h-10 rounded-full bg-surface-container-highest"
          />
          <Text className="font-black text-2xl text-indigo-700 tracking-tighter">The Estate Admin</Text>
        </View>

        <TouchableOpacity 
          onPress={() => Alert.alert("Notifikasi Admin", "Tidak ada pemberitahuan baru.")}
          className="p-2 rounded-xl text-indigo-600 active:scale-95"
        >
          <MaterialIcons name="notifications" size={24} color="#4f46e5" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Space for Bottom Nav
        className="px-6 flex-1 mt-4"
      >
        <View className="mb-6">
          <Text className="font-black text-[28px] text-on-surface leading-tight tracking-tight">Manage Rooms</Text>
        </View>

        {/* Search and Filters */}
        <View className="bg-surface-container-low rounded-xl p-4 mb-8">
          
          <View className="relative justify-center mb-4">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={20} color="#777587" />
            </View>
            <TextInput
              className="w-full pl-12 pr-4 h-[50px] bg-surface-container-highest rounded-xl text-on-surface"
              placeholder="Search by room number or tenant..."
              placeholderTextColor="#777587"
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <TouchableOpacity 
              onPress={() => Alert.alert("Filter", "Menampilkan semua status kamar.")}
              className="bg-surface-container-lowest flex-row items-center gap-2 px-6 h-[40px] rounded-xl shadow-sm mr-2 border border-outline-variant/10"
            >
              <MaterialIcons name="filter-list" size={18} color="#191c1e" />
              <Text className="font-semibold text-sm text-on-surface">All Status</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => Alert.alert("Filter", "Menampilkan kamar yang tersedia.")}
              className="bg-surface-container-highest px-6 h-[40px] rounded-xl justify-center mr-2"
            >
              <Text className="font-semibold text-sm text-on-surface-variant">Available</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Alert.alert("Filter", "Menampilkan kamar yang sedang ditempati.")}
              className="bg-surface-container-highest px-6 h-[40px] rounded-xl justify-center mr-2"
            >
              <Text className="font-semibold text-sm text-on-surface-variant">Occupied</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => Alert.alert("Filter", "Menampilkan kamar dalam perbaikan.")}
              className="bg-surface-container-highest px-6 h-[40px] rounded-xl justify-center"
            >
              <Text className="font-semibold text-sm text-on-surface-variant">Maintenance</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Room Grid */}
        <View className="flex-col gap-6">
          {roomsList.map((room) => (
            <View key={room.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 flex-col relative">
              
              <View className="h-48 relative overflow-hidden bg-surface-container-highest">
                <Image 
                  source={{ uri: FALLBACK_IMAGE }} 
                  className={`w-full h-full ${room.status === 'Maintenance' ? 'opacity-80' : ''}`}
                  resizeMode="cover"
                />
                {room.status === 'Maintenance' && (
                  <View className="absolute inset-0 bg-surface/20" />
                )}
                
                {/* Status Badge */}
                <View className={`absolute top-4 right-4 px-3 py-1 rounded-full flex-row items-center gap-1 shadow-sm ${
                  room.status === 'Available' ? 'bg-[#6df5e1]' : 
                  room.status === 'Occupied' ? 'bg-[#eceef0]' : 'bg-[#ffdad6]'
                }`}>
                  <MaterialIcons 
                    name={room.status === 'Available' ? 'check-circle' : room.status === 'Occupied' ? 'person' : 'build'} 
                    size={14} 
                    color={room.status === 'Available' ? '#006f64' : room.status === 'Occupied' ? '#464555' : '#93000a'} 
                  />
                  <Text className={`text-xs font-bold tracking-wide ${
                    room.status === 'Available' ? 'text-[#006f64]' : 
                    room.status === 'Occupied' ? 'text-[#464555]' : 'text-[#93000a]'
                  }`}>
                    {room.status}
                  </Text>
                </View>
              </View>

              <View className="p-5 flex-1 flex-col justify-between bg-surface-container-lowest relative z-10">
                <View>
                  <View className="flex-row justify-between items-start mb-2">
                    <Text className="font-black text-[22px] text-on-surface">{room.nomorKamar}</Text>
                    <Text className="font-extrabold text-[20px] tracking-tight text-on-surface">
                      Rp {room.harga ? room.harga.toLocaleString('id-ID') : 0}
                      <Text className="text-sm font-normal text-on-surface-variant">/bln</Text>
                    </Text>
                  </View>
                  <Text className="text-on-surface-variant text-sm mb-4">{room.fasilitas}</Text>
                  
                  {room.tenant && (
                    <View className="bg-surface-container-low p-3 rounded-lg mb-4">
                      <Text className="text-xs text-outline mb-1 font-semibold uppercase tracking-wider">Current Tenant</Text>
                      <View className="flex-row items-center gap-2">
                        <View className="w-6 h-6 rounded-full bg-[#4f46e5] items-center justify-center">
                          <Text className="text-xs font-bold text-white">{room.tenant.initials}</Text>
                        </View>
                        <Text className="text-sm font-medium text-on-surface">{room.tenant.name}</Text>
                      </View>
                    </View>
                  )}
                </View>

                <TouchableOpacity 
                  onPress={() => Alert.alert("Aksi Kamar", `Membuka pengaturan untuk kamar ${room.nomorKamar}...`)}
                  className="w-full bg-surface-container-highest active:bg-surface-container-high py-3 rounded-lg items-center mt-2"
                >
                  <Text className="text-on-surface font-semibold text-sm">
                    {room.status === 'Available' ? 'Edit' : room.status === 'Occupied' ? 'Manage' : 'Update Status'}
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>

      {/* FAB: Add Room */}
      <TouchableOpacity 
        onPress={() => router.push('/(admin)/add-room' as any)}
        className="absolute right-6 bottom-24 w-14 h-14 rounded-xl items-center justify-center shadow-lg z-40 active:scale-95"
        style={{ elevation: 5 }}
      >
        <LinearGradient
          colors={['#4f46e5', '#3525cd']}
          className="w-full h-full rounded-xl items-center justify-center"
        >
          <MaterialIcons name="add" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

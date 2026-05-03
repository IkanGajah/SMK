import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/config';
import { globalState } from '../_globalState';

const MOCK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_mNMZzsNd1vBAjCWoZs71R2hGuTlqVV1DZVZ6cwAq3GpjALdVkQcgURnFJfkzM0xjtRPq_isN71KWFFUv1P-C50j-iPO1nw72I8YyuL53OyPmbjCuCYl5K8p3E2i0UywlhkDqoMmXLbCOnG5kF9itawmqX1zxKHnk2TMQD_putTtfdUr1JnDgmJewB5-dhgWsm3FA7EhM5vIHlhTQo5eSw-TVI4EVWRapJAYqsHyAoiFIHU0G9DnffQb0ZRKSeMCjV5Txe7tu6Lo",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBOA4dudwRH3LLMs3f3T9v-Rehy3vsWcmjoLx_3I5dPIAwssFPBcGGOvAU8Kb7lZTukT8icr5H_hwZrNQOvSM53bqKsW5cahZyMrrjEFZTFATkU7uwWFUz4V1LCjsywcaqH6CCZBDiDNbqNl09EdTf4zkZ35HDTDywsgnUoyuwDxVhCzrOMVdOVgAWB4_m6ZlZdb0XXeAx5Z_BYcgR4tKnS2kZa3M8Nuv5diNOngqbKbmsfBJFKrD1CiLMTz72w6qSeWAUjErw_iuI",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDraX6DZHUWRTz7hcoqe2gGxwGZcS_MyKAXR3vQCjAZcj41hjEqcco82RcJoWlHYXlNLNI2SlypPsC81LAAIPomLF09yhCzPvmRZrDkU-BbQthxYSLK5g9K3xA-wkBYVJ3Gq6Fk9rqBWt9Cw4U_U1299TzZJBYmarD2GKB32yMUv9aGKXC0oP5XHum-zk_szzW28xHuUmYRVhD6ANgLf66rLgaLcO89UUISHOjfJKiTkmnCYBF3ECIACKTgtDGitqSl7aAeCAU10EM"
];

export default function RentScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');
  const [rentList, setRentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(globalState.namaLengkap || (globalState.email ? globalState.email.split('@')[0] : 'User'));
  const [userFoto, setUserFoto] = useState(globalState.foto);

  useFocusEffect(
    React.useCallback(() => {
      setUserName(globalState.namaLengkap || (globalState.email ? globalState.email.split('@')[0] : 'User'));
      setUserFoto(globalState.foto);
    }, [])
  );

  React.useEffect(() => {
    if (globalState.token) {
      fetchRentData();
    }
  }, []);

  const fetchRentData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaksi`, {
        headers: {
          'Authorization': `Bearer ${globalState.token}`
        }
      });
      const json = await response.json();
      if (json.data) {
        const mapped = json.data.map((t: any, index: number) => ({
          id: t.idTransaksi?.toString() || `rent${index}`,
          roomName: `Kamar ${t.kamar?.nomorKamar || 'Unknown'}`,
          roomType: t.kamar?.tipe || 'Tipe Standard',
          price: `Rp ${(t.hargaDeal || t.kamar?.harga || 0).toLocaleString('id-ID')}`,
          status: t.statusBayar || 'MENUNGGU',
          startDate: t.tanggalTransaksi || 'Unknown',
          duration: t.durasiSewa ? `${t.durasiSewa} bulan` : '1 bulan',
          image: MOCK_IMAGES[index % MOCK_IMAGES.length],
          originalId: t.idTransaksi
        }));
        setRentList(mapped);
      }
    } catch (error) {
      console.error("Error fetching transactions: ", error);
      setRentList([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBayar = async (idTransaksi: number, roomName: string) => {
    import('react-native').then(({ Alert }) => {
      Alert.alert(
        "Konfirmasi Pembayaran",
        `Bayar online untuk ${roomName}?`,
        [
          { text: "Batal", style: "cancel" },
          {
            text: "Bayar Sekarang",
            onPress: async () => {
              try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/transaksi/${idTransaksi}/bayar-online`, {
                  method: 'PUT',
                  headers: {
                    'Authorization': `Bearer ${globalState.token}`
                  }
                });
                const res = await response.json();
                if (response.ok) {
                  Alert.alert("Berhasil", "Pembayaran berhasil!");
                  fetchRentData();
                } else {
                  Alert.alert("Gagal", res.message || "Gagal melakukan pembayaran");
                }
              } catch (e) {
                Alert.alert("Error", "Terjadi kesalahan jaringan.");
              } finally {
                setLoading(false);
              }
            }
          }
        ]
      );
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>

      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-4">
          {userFoto ? (
            <Image
              source={{ uri: userFoto }}
              className="w-10 h-10 rounded-full bg-surface-container-high"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-primary-container items-center justify-center border border-outline-variant/30">
              <Text className="text-on-primary-container font-bold text-xs">
                {userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </Text>
            </View>
          )}
          <Text className="text-primary font-bold text-sm" numberOfLines={1}>{userName}</Text>
        </View>

        <TouchableOpacity
          className="hover:opacity-80 active:scale-95"
          onPress={() => router.push('/notifications' as any)}
        >
          <MaterialIcons name="notifications" size={24} color="#3525cd" />
          <View className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border-2 border-surface" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Space for Bottom Nav
        className="px-6 mt-4"
      >
        {/* Header Title */}
        <View className="mb-8">
          <Text className="font-black text-[28px] text-on-surface leading-tight tracking-tight">Sewa Saya</Text>
          <Text className="text-[15px] text-outline mt-2">Kelola penyewaan properti aktif.</Text>
        </View>

        {/* Filters */}
        <View className="flex-row gap-2 mb-8 bg-surface-container-low p-1.5 rounded-xl self-start">
          <TouchableOpacity
            onPress={() => setActiveTab('Active')}
            className={`px-6 py-2 rounded-lg shadow-sm ${activeTab === 'Active' ? 'bg-surface-container-lowest' : 'bg-transparent'}`}
          >
            <Text className={`font-medium text-sm ${activeTab === 'Active' ? 'text-primary' : 'text-on-surface-variant'}`}>Aktif</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('Past')}
            className={`px-6 py-2 rounded-lg ${activeTab === 'Past' ? 'bg-surface-container-lowest shadow-sm' : 'bg-transparent'}`}
          >
            <Text className={`font-medium text-sm ${activeTab === 'Past' ? 'text-primary' : 'text-on-surface-variant'}`}>Riwayat</Text>
          </TouchableOpacity>
        </View>

        {/* List Section */}
        <View className="gap-8">
          {loading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#3525cd" />
              <Text className="mt-4 text-outline font-medium">Memuat data sewa...</Text>
            </View>
          ) : rentList.length > 0 ? (
            rentList.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  if (item.status === 'MENUNGGU' && item.originalId) {
                    handleBayar(item.originalId, item.roomName);
                  } else {
                    import('react-native').then(({ Alert }) => {
                      Alert.alert("Detail Transaksi", `Menampilkan rincian pembayaran untuk ${item.roomName}\nStatus: ${item.status}`);
                    });
                  }
                }}
                className="flex-row w-full h-[180px] bg-surface-container-lowest rounded-xl shadow-sm overflow-visible relative active:scale-[0.98]"
                activeOpacity={0.9}
              >
                {/* Image Side */}
                <View className="w-1/3 h-full relative rounded-l-xl overflow-hidden bg-surface-container-high">
                  <Image
                    source={{ uri: item.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute inset-0 bg-black/10" />
                </View>

                {/* The Signature Overlap Badge (Price) */}
                <View className="absolute left-[25%] top-6 bg-surface-bright rounded-xl shadow-md px-4 py-2 flex-row items-center z-10 border border-outline-variant/20">
                  <Text className="font-[800] text-xl text-primary tracking-tight">{item.price}</Text>
                  <Text className="text-xs text-outline ml-1 mt-1">/bulan</Text>
                </View>

                {/* Content Side */}
                <View className="w-2/3 pl-12 pr-4 py-5 justify-between">

                  <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                      <Text className="font-bold text-[22px] text-on-surface leading-none" numberOfLines={1}>{item.roomName}</Text>
                      <Text className="text-sm text-outline mt-1" numberOfLines={1}>{item.roomType}</Text>
                    </View>

                    {/* Status Badge & Button */}
                    <View className="items-end">
                      <View className={`px-2.5 py-1 rounded-full ${item.status === 'LUNAS' ? 'bg-secondary-container' : 'bg-tertiary-container'}`}>
                        <Text className={`text-[9px] font-bold uppercase tracking-wider ${item.status === 'LUNAS' ? 'text-on-secondary-container' : 'text-on-tertiary-container'}`}>
                          {item.status}
                        </Text>
                      </View>
                      {item.status === 'MENUNGGU' && item.originalId && (
                        <View className="mt-2 bg-primary px-3 py-1 rounded-full shadow-sm">
                          <Text className="text-on-primary text-[10px] font-bold">Bayar</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View className="gap-1.5 mt-4">
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons name="calendar-today" size={16} color="#777587" />
                      <Text className="text-sm text-on-surface-variant">Starts <Text className="font-bold">{item.startDate}</Text></Text>
                    </View>
                    <View className="flex-row items-center gap-2">
                      <MaterialIcons name="timelapse" size={16} color="#777587" />
                      <Text className="text-sm text-on-surface-variant">Duration <Text className="font-bold">{item.duration}</Text></Text>
                    </View>
                  </View>

                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View className="py-20 items-center justify-center bg-surface-container-lowest rounded-2xl border border-dashed border-outline-variant">
              <MaterialIcons name="receipt-long" size={48} color="#777587" />
              <Text className="mt-4 text-on-surface-variant font-bold text-lg">Belum Ada Riwayat Sewa</Text>
              <Text className="text-outline text-sm text-center px-10 mt-2">Anda belum melakukan transaksi penyewaan kamar apapun.</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/config';
import { Kamar } from '@/types/types';
import { globalState } from '../globalState';

const { width } = Dimensions.get('window');

const MOCK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDxqro65wdqMJCGELbpTK2HPlNmzKiEwWj-175Ry_62ZyjHbh69ufz3Ui3mdnwCZ-wf2rD3csCqmLrvpdAQK5qrs8EFmKY63gUJWw09rdFdgembiQCkdBqIdEIMYb5Cnr-_FLQvaLKcN2Cxduy839CZ11uXEHIjX9gJQZQo9KXtlKm16o2xDAOzzOWdw8z2hBAxHEK0MswcAu6-tbgt7VAQcIgkquHOQHTER2LcngeE3Gw868DmomyNNSk0Ny7lWizBVAJRygj_LC8",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnaIDLGyfCnAhE6WcKF-nnmJyZZEtdT8SPEF9rAl906E8AvQhSRWALAS2xqnzpC4TufkgssCQ_uz55-X9rgfIvTknB9tRcIzBRc4GliNDvsBelN2tTSXCyrXZJMUlFPrVWTSbjsGMCzRvqsXSi8b3UCG9eQxnv3ZERTgjCqVFMIe1ywpJZcNAfRiuLoxt7w7g1XOVlNMM1HwcCkgdztoVkLthHRKQodThFKxPNAdYtjhY0tQRh9PCelKqWb8YE9Wxx8KisGRyqN_I",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzBZ-XRGDxmwRJAiOwBJJxiKFYOF3zKNO6yb5FwojhMAa3G2jZCn018YL1_aMbLtTJWphhfBXUq3ZoHOMfAJi6vTASJzuvPa142aScLBJpUyWq6UQZN1mppNP45l7h_95qr-k3P_pS6xVl58_lT66f0PIrWsemwQoBYSMmfNytJrEilYtdF2iFlHD7fZDPgx6vcl8tWVdG14bOzQdsoPFZLwV0h6aTu21KlgStWh8i-0BCYrVp-npXAuW2JMwYlu9Lvg8AzxsOeFQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDnu7qESrAXuSgFuoURlofHC-T7h_O2uHubZNAc4_ICgQkeasLepvx-qx-AQVrILKQK0kM7s728E5VpZ2avEfyA84Pf7CTAqOoJyu920AsnP-oDov2VTx5NDMTPOU0i5FQaUhu9U57thx74nH3auSK8Af7_WqQoh69f66rB6_RZH1T56kMAvKbo49nwv4WVUQaS31GupyzCY2-hyk445Mp5lKYVKj3CfZxcjXuyH0ry5YpE_QvXN9PgtByp34tgQSYgqmaY7eHcZAM"
];

export default function AuthenticatedCatalogScreen() {
  const router = useRouter();
  const [kamar, setKamar] = useState<Kamar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const namaDepan = globalState.email ? globalState.email.split('@')[0] : 'Budi';
  const greetingName = namaDepan.charAt(0).toUpperCase() + namaDepan.slice(1);

  useEffect(() => {
    fetchKamar();
  }, []);

  const fetchKamar = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/kamar`);
      const json = await response.json();
      if (json.data && json.data.length > 0) {
        setKamar(json.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Map Kamar API to display format
  const getDisplayData = (k: Kamar, index: number) => ({
    id: k.id.toString(),
    name: `Kamar ${k.nomorKamar}`,
    price: `Rp ${(k.harga / 1000000).toFixed(1)}jt`,
    location: 'Jakarta Selatan',
    rating: 4.8,
    image: MOCK_IMAGES[index % MOCK_IMAGES.length],
    facilities: k.fasilitas ? k.fasilitas.split(',').slice(0, 3) : [],
    available: k.status === 'Tersedia' ? 1 : 0,
    type: 'Kos Campur',
    originalHarga: k.harga
  });

  const filteredKamar = kamar.filter(item => {
    const matchesSearch = item.nomorKamar.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.fasilitas && item.fasilitas.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Tersedia') return item.status?.toUpperCase() === 'TERSEDIA';
    if (activeFilter === '< 1jt') return item.harga < 1000000;
    if (activeFilter === 'AC') return item.fasilitas && item.fasilitas.toUpperCase().includes('AC');
    if (activeFilter === 'KM Dalam') return item.fasilitas && item.fasilitas.toUpperCase().includes('KM DALAM');

    return true;
  });

  const displayData = filteredKamar.map((k, i) => getDisplayData(k, i));
  const REKOMENDASI = displayData.slice(0, 2);
  const JELAJAHI = displayData.slice(2);

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>

      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDs86UYiYKBOf2Hldgtj6i6HPWS5sEtMRwnwLKXJMKb7bWEW6EEgiIc3fVpCYSbj8H7xXOPoOB8IZBchj0JTVJOcit4iAm11Lkb0PzLbA7wRfDdIc-6R1MX6V_K89RI6fqrU8T5NTd5IVF_89xVwN9JMKuCsXsagD25KXhsbu0XcvRtAPlFDKEKlqWqlciZHOoruKr5qmoRcWukGIKWVIqIuv3DuIislJObU19o6FnbBV4RUdKo1L4AvJhJq6B6KWli0JW8QoPUuz0' }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="text-xs text-on-surface-variant font-medium">Selamat datang kembali</Text>
            <Text className="text-primary font-black text-2xl tracking-tight">Halo, {greetingName}! 👋</Text>
          </View>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >

        {/* Search & Filters */}
        <View className="px-4 mt-2">
          <View className="flex-row gap-3">
            <View className="flex-1 relative justify-center">
              <View className="absolute left-4 z-10">
                <MaterialIcons name="search" size={22} color="#777587" />
              </View>
              <TextInput
                className="w-full h-[52px] pl-12 pr-4 rounded-xl bg-surface-container-highest text-on-surface"
                placeholder="Cari lokasi, nama kos..."
                placeholderTextColor="#777587"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4" contentContainerStyle={{ gap: 12, paddingRight: 20 }}>
            <TouchableOpacity
              onPress={() => setActiveFilter('Semua')}
              className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === 'Semua' ? 'bg-tertiary-container' : 'bg-surface-container-lowest border border-outline-variant/20'}`}
            >
              <Text className={`font-medium text-sm ${activeFilter === 'Semua' ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>Semua</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('Tersedia')}
              className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === 'Tersedia' ? 'bg-tertiary-container' : 'bg-surface-container-lowest border border-outline-variant/20'}`}
            >
              <Text className={`font-medium text-sm ${activeFilter === 'Tersedia' ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>Tersedia</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('< 1jt')}
              className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === '< 1jt' ? 'bg-tertiary-container' : 'bg-surface-container-lowest border border-outline-variant/20'}`}
            >
              <Text className={`font-medium text-sm ${activeFilter === '< 1jt' ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>&lt; 1jt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('AC')}
              className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === 'AC' ? 'bg-tertiary-container' : 'bg-surface-container-lowest border border-outline-variant/20'}`}
            >
              <Text className={`font-medium text-sm ${activeFilter === 'AC' ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>AC</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveFilter('KM Dalam')}
              className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === 'KM Dalam' ? 'bg-tertiary-container' : 'bg-surface-container-lowest border border-outline-variant/20'}`}
            >
              <Text className={`font-medium text-sm ${activeFilter === 'KM Dalam' ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>KM Dalam</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#3525cd" className="mt-10" />
        ) : (
          <>
            {/* Rekomendasi Untukmu Section */}
            {REKOMENDASI.length > 0 && (
              <View className="mt-8 px-4">
                <View className="bg-surface-container-low rounded-[24px] p-5 relative overflow-hidden">
                  <Text className="font-bold text-[22px] text-on-surface mb-5">Rekomendasi Untukmu</Text>

                  <View className="gap-5">
                    {REKOMENDASI.map((item) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => router.push(`/kamar/${item.id}` as any)}
                        className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm flex-row h-[160px]"
                      >
                        <View className="w-[140px] h-full relative">
                          <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />

                          {/* Badge Rating or Sisa Kamar */}
                          {item.available === 1 ? (
                            <View className="absolute top-2 left-2 px-2 py-1 bg-error-container rounded-full flex-row items-center">
                              <Text className="text-on-error-container text-[10px] font-bold">Sisa 1 Kamar</Text>
                            </View>
                          ) : (
                            <View className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded-full flex-row items-center gap-1">
                              <MaterialIcons name="star" size={12} color="#3525cd" />
                              <Text className="text-primary text-[10px] font-bold">{item.rating}</Text>
                            </View>
                          )}
                        </View>

                        <View className="flex-1 p-3 justify-between">
                          <View>
                            <Text className="font-bold text-base text-on-surface mb-1" numberOfLines={2}>
                              {item.name}
                            </Text>
                            <Text className="text-xs text-on-surface-variant flex-row items-center mb-2">
                              <MaterialIcons name="location-on" size={12} /> {item.location}
                            </Text>
                            <View className="flex-row flex-wrap gap-1">
                              {item.facilities.map((fac, i) => (
                                <View key={i} className="px-1.5 py-0.5 bg-surface-container rounded flex-row items-center gap-1">
                                  <Text className="text-[9px] text-on-surface-variant">{fac.trim()}</Text>
                                </View>
                              ))}
                            </View>
                          </View>

                          <View className="flex-row justify-between items-end">
                            <View>
                              <Text className="text-primary font-bold text-lg">{item.price}<Text className="text-[10px] font-normal text-on-surface-variant">/bln</Text></Text>
                            </View>
                            <View className="w-8 h-8 rounded-full bg-surface-container-high items-center justify-center">
                              <MaterialIcons name="arrow-forward" size={16} color="#464555" />
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* Jelajahi Lebih Banyak Section */}
            {JELAJAHI.length > 0 && (
              <View className="mt-8 px-4">
                <Text className="font-bold text-[22px] text-on-surface mb-5">Jelajahi Lebih Banyak</Text>
                <View className="flex-row flex-wrap justify-between">
                  {JELAJAHI.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => router.push(`/kamar/${item.id}` as any)}
                      className="w-[48%] bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm mb-4 border border-outline-variant/20"
                    >
                      <View className="h-32 relative">
                        <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
                      </View>
                      <View className="p-3">
                        <View className="flex-row justify-between items-start mb-2">
                          <View className="px-1.5 py-0.5 bg-surface-container rounded">
                            <Text className="text-[8px] font-bold text-on-surface-variant uppercase">{item.type}</Text>
                          </View>
                          <View className="flex-row items-center gap-0.5">
                            <MaterialIcons name="star" size={10} color="#3525cd" />
                            <Text className="text-[10px] font-bold text-on-surface">{item.rating}</Text>
                          </View>
                        </View>
                        <Text className="font-bold text-sm text-on-surface mb-1" numberOfLines={1}>{item.name}</Text>
                        <Text className="text-[11px] text-on-surface-variant mb-3">
                          <MaterialIcons name="location-on" size={10} /> {item.location}
                        </Text>

                        <View className="h-[1px] bg-surface-container-high mb-3" />

                        <View className="flex-row justify-between items-center">
                          <Text className="text-on-surface font-bold text-sm">Rp {(item.originalHarga).toLocaleString('id-ID')}<Text className="text-[9px] font-normal text-on-surface-variant">/bln</Text></Text>
                          <MaterialIcons name="bookmark-border" size={16} color="#777587" />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity className="mt-4 px-8 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 items-center">
                  <Text className="font-medium text-on-surface">Muat Lebih Banyak</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Empty State */}
            {kamar.length === 0 && (
              <View className="mt-16 px-6 items-center justify-center">
                <MaterialIcons name="event-busy" size={64} color="#777587" />
                <Text className="mt-4 text-lg font-bold text-on-surface text-center">Belum Ada Kamar</Text>
                <Text className="mt-2 text-sm text-on-surface-variant text-center">Data kamar kosong.</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

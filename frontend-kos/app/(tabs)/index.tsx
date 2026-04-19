import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Dimensions,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Data Dummy Rekomendasi
const REKOMENDASI = [
  {
    id: 'r1',
    name: 'Kos Eksklusif Senayan Raya',
    price: 'Rp 2.5jt',
    location: 'Jakarta Selatan',
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxqro65wdqMJCGELbpTK2HPlNmzKiEwWj-175Ry_62ZyjHbh69ufz3Ui3mdnwCZ-wf2rD3csCqmLrvpdAQK5qrs8EFmKY63gUJWw09rdFdgembiQCkdBqIdEIMYb5Cnr-_FLQvaLKcN2Cxduy839CZ11uXEHIjX9gJQZQo9KXtlKm16o2xDAOzzOWdw8z2hBAxHEK0MswcAu6-tbgt7VAQcIgkquHOQHTER2LcngeE3Gw868DmomyNNSk0Ny7lWizBVAJRygj_LC8',
    facilities: ['WiFi', 'AC', 'Laundry'],
    available: 2
  },
  {
    id: 'r2',
    name: 'Kos Nyaman Tebet Barat',
    price: 'Rp 1.8jt',
    location: 'Jakarta Selatan',
    rating: 4.8, // using an assumed rating since not explicitly on card
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnaIDLGyfCnAhE6WcKF-nnmJyZZEtdT8SPEF9rAl906E8AvQhSRWALAS2xqnzpC4TufkgssCQ_uz55-X9rgfIvTknB9tRcIzBRc4GliNDvsBelN2tTSXCyrXZJMUlFPrVWTSbjsGMCzRvqsXSi8b3UCG9eQxnv3ZERTgjCqVFMIe1ywpJZcNAfRiuLoxt7w7g1XOVlNMM1HwcCkgdztoVkLthHRKQodThFKxPNAdYtjhY0tQRh9PCelKqWb8YE9Wxx8KisGRyqN_I',
    facilities: ['WiFi', 'Dapur'],
    available: 1
  }
];

// Data Dummy Jelajahi Lebih Banyak
const JELAJAHI = [
  {
    id: 'j1',
    name: 'Kos Harmoni Indah Bintaro',
    type: 'Kos Campur',
    price: 'Rp 1.5jt',
    location: 'Tangerang Selatan',
    rating: 4.7,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzBZ-XRGDxmwRJAiOwBJJxiKFYOF3zKNO6yb5FwojhMAa3G2jZCn018YL1_aMbLtTJWphhfBXUq3ZoHOMfAJi6vTASJzuvPa142aScLBJpUyWq6UQZN1mppNP45l7h_95qr-k3P_pS6xVl58_lT66f0PIrWsemwQoBYSMmfNytJrEilYtdF2iFlHD7fZDPgx6vcl8tWVdG14bOzQdsoPFZLwV0h6aTu21KlgStWh8i-0BCYrVp-npXAuW2JMwYlu9Lvg8AzxsOeFQ'
  },
  {
    id: 'j2',
    name: 'Kos Pria Kemang Raya',
    type: 'Kos Putra',
    price: 'Rp 3.2jt',
    location: 'Jakarta Selatan',
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnu7qESrAXuSgFuoURlofHC-T7h_O2uHubZNAc4_ICgQkeasLepvx-qx-AQVrILKQK0kM7s728E5VpZ2avEfyA84Pf7CTAqOoJyu920AsnP-oDov2VTx5NDMTPOU0i5FQaUhu9U57thx74nH3auSK8Af7_WqQoh69f66rB6_RZH1T56kMAvKbo49nwv4WVUQaS31GupyzCY2-hyk445Mp5lKYVKj3CfZxcjXuyH0ry5YpE_QvXN9PgtByp34tgQSYgqmaY7eHcZAM'
  },
  {
    id: 'j3',
    name: 'Griya Putri Melati',
    type: 'Kos Putri',
    price: 'Rp 1.2jt',
    location: 'Depok',
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgVjSMuBYceVEfamCsnOz4vpCGU4aDA_RcJTv8phfVuNqhI76rzKEdzRFz8zSnS7IulQcRvkFJ6Z1yeZi_no2y8saRUKtY8t8FJ6C5vYNhTCBVuaGXI_ML1Z0UjyTGbyqFyLiA4ja7vlaoInVUNfPF7tz-stl66FHuNmNFxzZxWFJktUzThKgVX-zsD5uKEWJfN63LtyMlPHsAWAh6CvTE2Q2aIs2tQhmIjgeM7rTbObgOaqvOenEm-QRP339GW7OuZFCSwMs5YDY'
  }
];

export default function AuthenticatedCatalogScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  const filterData = (data: any[]) => {
    return data.filter(item => {
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchFilter = activeFilter === 'Semua';
      if (activeFilter !== 'Semua') {
        const itemType = item.type || '';
        if (activeFilter === 'Kos Putra' && itemType === 'Kos Putra') matchFilter = true;
        if (activeFilter === 'Kos Putri' && itemType === 'Kos Putri') matchFilter = true;
        if (activeFilter === 'Campur' && itemType === 'Kos Campur') matchFilter = true;
        if (activeFilter === 'Eksklusif' && item.name.includes('Eksklusif')) matchFilter = true;
      }
                          
      return matchSearch && matchFilter;
    });
  };

  const filteredRekomendasi = filterData(REKOMENDASI);
  const filteredJelajahi = filterData(JELAJAHI);

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-3">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVZ8PWxFhEhNzMxiXDaDjizlu6FQbmEZ329Qd-eWMJgqoij13UUe_7Aodr86e0nvOzMbG8CpXFOYDKlHb2QUwmmJFNqMRLNpJNlGvEmkx1_u6SHmXasbu29pxmah-NyJVgWhIxvpsPdpeFcgwnJXyFD0idMA25ypBWznQKY3lQLblEHt6F8h3lKsP7WFE1RkXpFzifMVq-UdZbu72n26B5tjFQJy2iiLyK_rbhmhEEfi-D-u-jl-CXDozf5YsLbIZ-UpuYsf_MO5g' }}
            className="w-12 h-12 rounded-full"
          />
          <View>
            <Text className="text-xs text-on-surface-variant font-medium">Selamat datang kembali</Text>
            <Text className="text-primary font-black text-2xl tracking-tight">Halo, Budi! 👋</Text>
          </View>
        </View>

        <TouchableOpacity className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm relative">
          <MaterialIcons name="notifications" size={24} color="#3525cd" />
          <View className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }} // Space for Bottom Nav
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
            <TouchableOpacity className="h-[52px] px-5 rounded-xl bg-primary-container flex-row items-center gap-2 shadow-sm">
              <MaterialIcons name="tune" size={20} color="#dad7ff" />
              <Text className="text-on-primary-container font-medium">Filter</Text>
            </TouchableOpacity>
          </View>

          {/* Chips */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4" contentContainerStyle={{ gap: 12, paddingRight: 20 }}>
            <TouchableOpacity 
              onPress={() => setActiveFilter('Semua')}
              className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === 'Semua' ? 'bg-tertiary-container' : 'bg-surface-container-lowest'}`}
            >
              <Text className={`font-medium text-sm ${activeFilter === 'Semua' ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>Semua</Text>
            </TouchableOpacity>
            {['Kos Putra', 'Kos Putri', 'Campur', 'Eksklusif'].map((cat, i) => (
              <TouchableOpacity 
                key={i} 
                onPress={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-full shadow-sm ${activeFilter === cat ? 'bg-tertiary-container' : 'bg-surface-container-lowest'}`}
              >
                <Text className={`font-medium text-sm ${activeFilter === cat ? 'text-on-tertiary-container' : 'text-on-surface-variant'}`}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Rekomendasi Untukmu Section */}
        <View className="mt-8 px-4">
          <View className="bg-surface-container-low rounded-[24px] p-5 relative overflow-hidden">
            <Text className="font-bold text-[22px] text-on-surface mb-5">Rekomendasi Untukmu</Text>
            
            <View className="gap-5">
              {filteredRekomendasi.length > 0 ? filteredRekomendasi.map((item) => (
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
                        {item.facilities.map((fac: string, i: number) => (
                          <View key={i} className="px-1.5 py-0.5 bg-surface-container rounded flex-row items-center gap-1">
                            <Text className="text-[9px] text-on-surface-variant">{fac}</Text>
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
              )) : (
                <Text className="text-on-surface-variant text-center my-4">Tidak ada rekomendasi yang sesuai.</Text>
              )}
            </View>
          </View>
        </View>

        {/* Jelajahi Lebih Banyak Section */}
        <View className="mt-8 px-4">
          <Text className="font-bold text-[22px] text-on-surface mb-5">Jelajahi Lebih Banyak</Text>
          <View className="flex-row flex-wrap justify-between">
            {filteredJelajahi.length > 0 ? filteredJelajahi.map((item) => (
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
                    <Text className="text-on-surface font-bold text-sm">{item.price}<Text className="text-[9px] font-normal text-on-surface-variant">/bln</Text></Text>
                    <MaterialIcons name="bookmark-border" size={16} color="#777587" />
                  </View>
                </View>
              </TouchableOpacity>
            )) : (
              <Text className="text-on-surface-variant text-center w-full my-4">Tidak ada kos yang sesuai.</Text>
            )}
          </View>
          
          {filteredJelajahi.length > 0 && (
          <TouchableOpacity className="mt-4 px-8 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 items-center">
            <Text className="font-medium text-on-surface">Muat Lebih Banyak</Text>
          </TouchableOpacity>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

import React from 'react';
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
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

// Data Dummy sebagai fallback
const TENANTS_DATA = [
  {
    id: 't1',
    namaLengkap: 'Eleanor Vance',
    email: 'eleanor@example.com',
    telepon: '08123456789'
  }
];

export default function AdminTenantsScreen() {
  const [tenants, setTenants] = useState<any[]>([]);

  const fetchTenants = async () => {
    try {
      const response = await fetch('http://10.1.13.53:8080/api/penyewa');
      if (!response.ok) throw new Error('Server error');
      const json = await response.json();
      if (json.data && json.data.length > 0) {
        setTenants(json.data);
      } else {
        setTenants(TENANTS_DATA);
      }
    } catch (error) {
      console.log('Error fetch penyewa, fallback ke dummy');
      setTenants(TENANTS_DATA);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTenants();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-3">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBco25FB1F-_etYKkQS5qhE2h_wD9s2Q41gasutGoNFxveVAX9Svl__6utjinbiwKd8PSq25l6ms5oH186B17T9snvdtuc_9fke7pXFrvgq3EKsyzO-SQBd5B2-phet9CkVrHqhIFdmxEfR-DiGmUNS5iFlDlXj1JDBJz7wan1dWfFpe9q073yC1qc5mZk1FFOcBskbyXp4HsbicZXhL26ljqrC022Cr1G5bOFkzFZbGPabydqxJKvTXQOTnNPgdCALlZpsiYxXVCU' }}
            className="w-10 h-10 rounded-full shadow-sm"
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
        <View className="mb-8">
          <Text className="font-black text-[28px] text-on-surface leading-tight tracking-tight mb-2">Active Tenants</Text>
          <Text className="text-[15px] text-on-surface-variant">Manage your active residents, view upcoming dues, and handle communications seamlessly.</Text>
        </View>

        {/* Search and Add Button */}
        <View className="flex-row gap-3 mb-8">
          <View className="flex-1 relative justify-center">
            <View className="absolute left-4 z-10">
              <MaterialIcons name="search" size={20} color="#777587" />
            </View>
            <TextInput
              className="w-full pl-12 pr-4 h-[52px] bg-surface-container-highest rounded-xl text-on-surface"
              placeholder="Search tenants..."
              placeholderTextColor="#777587"
            />
          </View>
          <TouchableOpacity 
            onPress={() => Alert.alert("Tambah Penyewa", "Membuka formulir pendaftaran penyewa baru...")}
            className="h-[52px] w-[52px] rounded-xl overflow-hidden shadow-sm active:scale-95"
          >
            <LinearGradient
              colors={['#4f46e5', '#3525cd']}
              className="w-full h-full justify-center items-center"
            >
              <MaterialIcons name="person-add" size={24} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Tenant Cards */}
        <View className="flex-col gap-6">
          {tenants.map((tenant, index) => (
            <View key={tenant.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 overflow-hidden relative">
              
              {/* Header: User Info & Status */}
              <View className="flex-row items-start justify-between mb-6 z-10 relative">
                <View className="flex-row items-center gap-3">
                  <View className="w-14 h-14 rounded-full bg-primary-container items-center justify-center border-2 border-surface">
                    <Text className="font-bold text-xl text-on-primary-container">
                      {tenant.namaLengkap ? tenant.namaLengkap.charAt(0).toUpperCase() : 'U'}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-bold text-[18px] text-on-surface">{tenant.namaLengkap}</Text>
                    <View className="flex-row items-center gap-1 mt-0.5">
                      <MaterialIcons name="email" size={14} color="#464555" />
                      <Text className="text-[13px] text-on-surface-variant">{tenant.email}</Text>
                    </View>
                  </View>
                </View>

                {/* Status Badge */}
                <View className="px-3 py-1 rounded-full flex-row items-center gap-1 bg-[#e2dfff]/50">
                  <Text className="text-[12px] font-semibold tracking-wide text-[#3d37a9]">
                    Registered
                  </Text>
                </View>
              </View>

              {/* Rent Info Block */}
              <View className="bg-surface-container-low rounded-xl p-4 mb-6 flex-row justify-between items-end">
                <View>
                  <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Rent Amount</Text>
                  <Text className="font-extrabold text-[20px] text-on-surface">{tenant.rentAmount}</Text>
                </View>
                <View className="items-end">
                  <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Next Due</Text>
                  <Text className="font-semibold text-[15px] text-on-surface">{tenant.nextDue}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity 
                  onPress={() => Alert.alert("Pesan", `Membuka obrolan dengan ${tenant.name}...`)}
                  className={`flex-1 h-[44px] rounded-xl flex-row items-center justify-center gap-2 active:scale-95 ${
                    tenant.status.includes('Due') ? 'bg-[#6df5e1]' : 'bg-surface-container'
                  }`}
                >
                  <MaterialIcons name="chat" size={20} color={tenant.status.includes('Due') ? '#006f64' : '#191c1e'} />
                  <Text className={`font-semibold ${tenant.status.includes('Due') ? 'text-[#006f64]' : 'text-on-surface'}`}>Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  onPress={() => Alert.alert("Opsi Tambahan", `Menu opsi lanjutan untuk ${tenant.name}`)}
                  className="w-[44px] h-[44px] rounded-xl border border-outline-variant/20 items-center justify-center bg-surface-container-lowest active:scale-95"
                >
                  <MaterialIcons name="more-horiz" size={20} color="#464555" />
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

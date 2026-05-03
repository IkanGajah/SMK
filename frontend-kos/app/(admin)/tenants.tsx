import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { API_BASE_URL } from '@/constants/config';
import { globalState } from '../_globalState';

export default function AdminTenantsScreen() {
  const [tenants, setTenants] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      // We fetch transactions to see current active tenants and their status
      const response = await fetch(`${API_BASE_URL}/transaksi`, {
        headers: { 'Authorization': `Bearer ${globalState.token}` }
      });
      const json = await response.json();
      if (json.data) {
        const mapped = json.data.map((t: any) => ({
          id: t.idTransaksi.toString(),
          name: t.penyewa?.nama || 'Unknown Tenant',
          room: `Room ${t.kamar?.nomorKamar || '?'}`,
          rentAmount: `Rp ${(t.hargaDeal || 0).toLocaleString('id-ID')}`,
          nextDue: t.tanggalTransaksi || 'N/A',
          status: t.statusBayar === 'LUNAS' ? 'Paid' : 'Pending',
          image: null,
          initials: (t.penyewa?.nama || 'U').split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        }));
        setTenants(mapped);
      }
    } catch (error) {
      console.error('Error fetching tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.room.toLowerCase().includes(searchQuery.toLowerCase())
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

        <TouchableOpacity className="p-2 rounded-xl text-indigo-600 active:scale-95">
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <TouchableOpacity className="h-[52px] w-[52px] rounded-xl overflow-hidden shadow-sm active:scale-95">
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
          {loading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text className="mt-4 text-on-surface-variant font-medium">Loading tenants...</Text>
            </View>
          ) : filteredTenants.length > 0 ? (
            filteredTenants.map((tenant, index) => (
              <View key={tenant.id || index} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 overflow-hidden relative">
                
                {/* Accents for different statuses */}
                {tenant.status === 'Pending' && (
                  <LinearGradient
                    colors={['#4f46e5', '#006b5f']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    className="absolute top-0 left-0 w-full h-1"
                  />
                )}

                {/* Header: User Info & Status */}
                <View className="flex-row items-start justify-between mb-6 z-10 relative">
                  <View className="flex-row items-center gap-3">
                    {tenant.image ? (
                      <Image 
                        source={{ uri: tenant.image }} 
                        className="w-14 h-14 rounded-full border-2 border-surface"
                      />
                    ) : (
                      <View className="w-14 h-14 rounded-full bg-primary-container items-center justify-center border-2 border-surface">
                        <Text className="font-bold text-xl text-on-primary-container">{tenant.initials}</Text>
                      </View>
                    )}
                    <View>
                      <Text className="font-bold text-[18px] text-on-surface">{tenant.name}</Text>
                      <View className="flex-row items-center gap-1 mt-0.5">
                        <MaterialIcons name="bed" size={16} color="#464555" />
                        <Text className="text-[13px] text-on-surface-variant">{tenant.room}</Text>
                      </View>
                    </View>
                  </View>

                  {/* Status Badge */}
                  <View className={`px-3 py-1 rounded-full flex-row items-center gap-1 ${
                    tenant.status === 'Pending' ? 'bg-[#ffdad6]' :
                    tenant.status === 'Paid' ? 'bg-[#e6e8ea]' : 'bg-[#e2dfff]/50'
                  }`}>
                    {tenant.status === 'Paid' && <MaterialIcons name="check-circle" size={14} color="#464555" />}
                    <Text className={`text-[12px] font-semibold tracking-wide ${
                      tenant.status === 'Pending' ? 'text-[#93000a]' :
                      tenant.status === 'Paid' ? 'text-[#464555]' : 'text-[#3d37a9]'
                    }`}>
                      {tenant.status}
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
                    <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Last Transaction</Text>
                    <Text className="font-semibold text-[15px] text-on-surface">{tenant.nextDue}</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity className={`flex-1 h-[44px] rounded-xl flex-row items-center justify-center gap-2 active:scale-95 ${
                    tenant.status === 'Pending' ? 'bg-[#6df5e1]' : 'bg-surface-container'
                  }`}>
                    <MaterialIcons name="chat" size={20} color={tenant.status === 'Pending' ? '#006f64' : '#191c1e'} />
                    <Text className={`font-semibold ${tenant.status === 'Pending' ? 'text-[#006f64]' : 'text-on-surface'}`}>Message</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="w-[44px] h-[44px] rounded-xl border border-outline-variant/20 items-center justify-center bg-surface-container-lowest active:scale-95">
                    <MaterialIcons name="more-horiz" size={20} color="#464555" />
                  </TouchableOpacity>
                </View>

              </View>
            ))
          ) : (
            <View className="py-20 items-center">
              <MaterialIcons name="person-off" size={48} color="#777587" />
              <Text className="mt-4 text-on-surface-variant font-medium">No tenants found</Text>
            </View>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

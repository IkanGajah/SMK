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
import { Kamar } from '@/types/types';

// Mock images for rooms
const MOCK_ROOM_IMAGES = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDMsiOEr6jpsbQ-59R08kDaVoD3YkJY71p-xL9DkOhw1rpnhQ0jITL192xH6rcKJDl00-XzNLEXJHzjvQFC3wjRB2uQe4JEGJ-yqcCYrvuOI4hSbT_vBa9ibBlp-m94dvEs2ewzIuQcgR1YIvc1-y5ZvSTmsKeyaMSAZBwOqnBiKQ_T5ZNWkA-HNtx-i9j26g85D8onp9qeG3Bbx21R-3x7CGQAJaqMpCUTy2qbTTB1T3UKuXDuWb77cD8vQ-FKwp3MAQPT_H5KLDA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAO3leihuQEcrEdVvfh37VmDG1nSPo_q_aQ6i-24T4U_N3dkZxjwAJNwsRsBHSPhqycOW6fKzPaPhk4BgFLoKsn_nZeOW8oEGvyGf_I9R3YWiOpnUCHyQO8v7RoYkMd6JnSFLSB8JMZgYaBKAAYLAlZcB2oy-hF1N0zboM1Qokanrn2Q3LlOE9iVC055DAlEwzKrxgpDw_1GUIMRUrzG7NxN06Gk_kikj8OLXOKg0a8jyfGSjuXeI0v0pxrkP78ua6060EcfldOjkk',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBUJADqgkC6u67qv7q3fNXAWmo1ReBGp6K4L-UyQqjVgIsIKL-W_GujeBD-U8agORDgbo_cjLRUmybkXzSRcqjFPcXt1Cza7vyEpnY4A3QGleQcfveH-Dt7gIp1sOalZMBN5Ns3LIYeSFvPYsJ1JF-NO_Rtn0LvOlv_FJvOIM4poIzlPFKgudqZmEVVp9XWg8juY5wxWt3R6EmHBnmbmTmdcdingI84glUpLHeC8RGk_wskyma6eRcC22h13fytBBM6gBUv9lxoA88'
];

export default function AdminRoomsScreen() {
  const [rooms, setRooms] = React.useState<Kamar[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/kamar`);
      const json = await response.json();
      if (json.data) {
        setRooms(json.data);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room => 
    room.nomorKamar.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.fasilitas?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusDisplay = (status: string) => {
    switch (status?.toUpperCase()) {
      case 'TERSEDIA': return 'Available';
      case 'TERISI': return 'Occupied';
      case 'PERBAIKAN': return 'Maintenance';
      default: return status || 'Available';
    }
  };
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

        <TouchableOpacity className="p-2 rounded-xl text-indigo-600 active:scale-95">
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
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            <TouchableOpacity className="bg-surface-container-lowest flex-row items-center gap-2 px-6 h-[40px] rounded-xl shadow-sm mr-2 border border-outline-variant/10">
              <MaterialIcons name="filter-list" size={18} color="#191c1e" />
              <Text className="font-semibold text-sm text-on-surface">All Status</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-surface-container-highest px-6 h-[40px] rounded-xl justify-center mr-2">
              <Text className="font-semibold text-sm text-on-surface-variant">Available</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface-container-highest px-6 h-[40px] rounded-xl justify-center mr-2">
              <Text className="font-semibold text-sm text-on-surface-variant">Occupied</Text>
            </TouchableOpacity>

            <TouchableOpacity className="bg-surface-container-highest px-6 h-[40px] rounded-xl justify-center">
              <Text className="font-semibold text-sm text-on-surface-variant">Maintenance</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Room Grid */}
        <View className="flex-col gap-6">
          {loading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#4f46e5" />
              <Text className="mt-4 text-on-surface-variant font-medium">Loading rooms...</Text>
            </View>
          ) : filteredRooms.length > 0 ? (
            filteredRooms.map((room, index) => {
              const statusDisplay = getStatusDisplay(room.status || 'TERSEDIA');
              return (
                <View key={room.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10 flex-col relative">
                  
                  <View className="h-48 relative overflow-hidden bg-surface-container-highest">
                    <Image 
                      source={{ uri: MOCK_ROOM_IMAGES[index % MOCK_ROOM_IMAGES.length] }} 
                      className={`w-full h-full ${statusDisplay === 'Maintenance' ? 'opacity-80' : ''}`}
                      resizeMode="cover"
                    />
                    {statusDisplay === 'Maintenance' && (
                      <View className="absolute inset-0 bg-surface/20" />
                    )}
                    
                    {/* Status Badge */}
                    <View className={`absolute top-4 right-4 px-3 py-1 rounded-full flex-row items-center gap-1 shadow-sm ${
                      statusDisplay === 'Available' ? 'bg-[#6df5e1]' : 
                      statusDisplay === 'Occupied' ? 'bg-[#eceef0]' : 'bg-[#ffdad6]'
                    }`}>
                      <MaterialIcons 
                        name={statusDisplay === 'Available' ? 'check-circle' : statusDisplay === 'Occupied' ? 'person' : 'build'} 
                        size={14} 
                        color={statusDisplay === 'Available' ? '#006f64' : statusDisplay === 'Occupied' ? '#464555' : '#93000a'} 
                      />
                      <Text className={`text-xs font-bold tracking-wide ${
                        statusDisplay === 'Available' ? 'text-[#006f64]' : 
                        statusDisplay === 'Occupied' ? 'text-[#464555]' : 'text-[#93000a]'
                      }`}>
                        {statusDisplay}
                      </Text>
                    </View>
                  </View>

                  <View className="p-5 flex-1 flex-col justify-between bg-surface-container-lowest relative z-10">
                    <View>
                      <View className="flex-row justify-between items-start mb-2">
                        <Text className="font-black text-[22px] text-on-surface">Kamar {room.nomorKamar}</Text>
                        <Text className="font-extrabold text-[20px] tracking-tight text-on-surface">
                          Rp {((room.harga || room.hargaSewa || 0) / 1000).toFixed(0)}k<Text className="text-sm font-normal text-on-surface-variant">/mo</Text>
                        </Text>
                      </View>
                      <Text className="text-on-surface-variant text-sm mb-4">{room.fasilitas || 'Standar Room'}</Text>
                      
                      {statusDisplay === 'Occupied' && (
                        <View className="bg-surface-container-low p-3 rounded-lg mb-4">
                          <Text className="text-xs text-outline mb-1 font-semibold uppercase tracking-wider">Current Tenant</Text>
                          <View className="flex-row items-center gap-2">
                            <View className="w-6 h-6 rounded-full bg-[#4f46e5] items-center justify-center">
                              <Text className="text-xs font-bold text-white">?</Text>
                            </View>
                            <Text className="text-sm font-medium text-on-surface">Active Resident</Text>
                          </View>
                        </View>
                      )}
                    </View>

                    <TouchableOpacity className="w-full bg-surface-container-highest active:bg-surface-container-high py-3 rounded-lg items-center mt-2">
                      <Text className="text-on-surface font-semibold text-sm">
                        {statusDisplay === 'Available' ? 'Edit' : statusDisplay === 'Occupied' ? 'Manage' : 'Update Status'}
                      </Text>
                    </TouchableOpacity>
                  </View>

                </View>
              );
            })
          ) : (
            <View className="py-20 items-center">
              <MaterialIcons name="search-off" size={48} color="#777587" />
              <Text className="mt-4 text-on-surface-variant font-medium">No rooms found</Text>
            </View>
          )}
        </View>

      </ScrollView>

      {/* FAB: Add Room */}
      <TouchableOpacity 
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

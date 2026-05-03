import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { API_BASE_URL } from '@/constants/config';
import { globalState } from '../_globalState';
import { Kamar } from '@/types/types';

export default function AdminDashboardScreen() {
  const [loading, setLoading] = React.useState(true);
  const [stats, setStats] = React.useState({
    totalRooms: 0,
    availableRooms: 0,
    occupiedRooms: 0,
    totalTenants: 0
  });
  const [recentActivity, setRecentActivity] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch Rooms
      const roomsRes = await fetch(`${API_BASE_URL}/kamar`);
      const roomsJson = await roomsRes.json();
      
      // Fetch Transactions
      const transRes = await fetch(`${API_BASE_URL}/transaksi`, {
        headers: { 'Authorization': `Bearer ${globalState.token}` }
      });
      const transJson = await transRes.json();

      const rooms = roomsJson.data || [];
      const transactions = transJson.data || [];

      const available = rooms.filter((r: Kamar) => r.status?.toUpperCase() === 'TERSEDIA').length;
      const occupied = rooms.filter((r: Kamar) => r.status?.toUpperCase() === 'TERISI').length;
      
      // Calculate unique tenants from transactions
      const uniqueTenants = new Set(transactions.map((t: any) => t.penyewa?.idPenyewa)).size;

      setStats({
        totalRooms: rooms.length,
        availableRooms: available,
        occupiedRooms: occupied,
        totalTenants: uniqueTenants || 0
      });

      setRecentActivity(transactions.slice(0, 4).map((t: any) => ({
        id: t.idTransaksi,
        title: `${t.penyewa?.nama || 'Someone'} paid rent for Kamar ${t.kamar?.nomorKamar || '?'}`,
        time: 'Recently',
        type: t.statusBayar === 'LUNAS' ? 'payment' : 'pending'
      })));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color="#4f46e5" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-3">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-QOLuQcyB3qq4LOXq_XpyjC4-KY4_qB88rawLA4BM3LlCHW84fM_qnvLfrIOn6JfvTmJNp4TVie31WeBwl_rCCxUD9chphnLjIdZkTkV5TrcVDAS6GN3-4O4L-OxAnXDPmGWv-9KU1aIGhc3iKSSGmew3U8bUQ7SeLW-M_UeQDwQtrI1CGNZUcUnBju9gCdDbCywVugDIvna74g4mi9gL2NfYa1u9nlUqqAV1sVimdUCgu1i7Gq1akutfIO1gtcAsgd4OGFba1cE' }}
            className="w-10 h-10 rounded-full border-2 border-surface-container-low"
          />
          <Text className="font-black text-2xl text-indigo-700 tracking-tighter">The Estate Admin</Text>
        </View>

        <TouchableOpacity className="p-2 rounded-xl text-indigo-600 hover:bg-indigo-50 active:scale-95">
          <MaterialIcons name="notifications" size={24} color="#4f46e5" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Space for Bottom Nav
        className="px-6 mt-4 flex-1"
      >
        
        {/* Header Section */}
        <View className="mb-8">
          <Text className="font-black text-[28px] leading-tight text-on-surface">Overview</Text>
          <Text className="text-[15px] text-on-surface-variant mt-1">Here is a quick snapshot of your properties today.</Text>
        </View>

        {/* Summary Cards */}
        <View className="flex-row flex-wrap justify-between gap-y-4 mb-8">
          
          {/* Total Rooms */}
          <View className="w-[48%] bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden">
            <View className="flex-row justify-between items-start z-10">
              <View>
                <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Total Rooms</Text>
                <Text className="font-extrabold text-2xl text-on-surface tracking-tight">{stats.totalRooms}</Text>
              </View>
              <View className="p-2 bg-[#e2dfff] rounded-lg">
                <MaterialIcons name="apartment" size={20} color="#3525cd" />
              </View>
            </View>
          </View>

          {/* Available */}
          <View className="w-[48%] bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden">
            <View className="flex-row justify-between items-start z-10">
              <View>
                <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Available</Text>
                <Text className="font-extrabold text-2xl text-on-surface tracking-tight">{stats.availableRooms}</Text>
              </View>
              <View className="p-2 bg-[#6df5e1] rounded-lg">
                <MaterialIcons name="vpn-key" size={20} color="#006b5f" />
              </View>
            </View>
          </View>

          {/* Occupied */}
          <View className="w-[48%] bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden">
            <View className="flex-row justify-between items-start z-10">
              <View>
                <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Occupied</Text>
                <Text className="font-extrabold text-2xl text-on-surface tracking-tight">{stats.occupiedRooms}</Text>
              </View>
              <View className="p-2 bg-[#dbd7ff] rounded-lg">
                <MaterialIcons name="meeting-room" size={20} color="#3d37a9" />
              </View>
            </View>
          </View>

          {/* Total Tenants */}
          <View className="w-[48%] bg-surface-container-lowest rounded-xl p-5 shadow-sm relative overflow-hidden">
            <View className="flex-row justify-between items-start z-10">
              <View>
                <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Tenants</Text>
                <Text className="font-extrabold text-2xl text-on-surface tracking-tight">{stats.totalTenants}</Text>
              </View>
              <View className="p-2 bg-[#e2dfff] rounded-lg">
                <MaterialIcons name="groups" size={20} color="#3525cd" />
              </View>
            </View>
          </View>
        </View>

        {/* Occupancy Trends */}
        <View className="bg-surface-container-low rounded-xl p-5 flex-col gap-4 mb-8">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-[20px] text-on-surface">Occupancy Trends</Text>
            <TouchableOpacity>
              <Text className="text-primary text-xs font-semibold">View Report</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-surface-container-lowest rounded-xl min-h-[200px] shadow-sm flex items-center justify-center relative overflow-hidden">
            <LinearGradient
              colors={['rgba(79,70,229,0.15)', 'transparent']}
              className="absolute bottom-0 left-0 w-full h-3/4"
            />
            <View className="bg-surface-container-lowest/80 px-4 py-2 rounded-lg border border-outline-variant/20">
              <Text className="text-on-surface-variant text-sm">Interactive Chart Area</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex-col gap-4">
          <Text className="font-bold text-[20px] text-on-surface">Recent Activity</Text>
          
          <View className="flex-col gap-0">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <View key={activity.id || index} className="flex-row gap-4 py-4 border-b border-outline-variant/15">
                  <View className={`w-10 h-10 rounded-full items-center justify-center ${activity.type === 'payment' ? 'bg-secondary-container' : 'bg-tertiary-container'}`}>
                    <MaterialIcons 
                      name={activity.type === 'payment' ? 'payments' : 'pending-actions'} 
                      size={18} 
                      color={activity.type === 'payment' ? '#006f64' : '#3d37a9'} 
                    />
                  </View>
                  <View className="flex-1 justify-center">
                    <Text className="text-[14px] text-on-surface leading-snug">
                      {activity.title}
                    </Text>
                    <Text className="text-[11px] text-on-surface-variant mt-0.5">{activity.time}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="py-10 items-center">
                <Text className="text-on-surface-variant text-sm">No recent activity</Text>
              </View>
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

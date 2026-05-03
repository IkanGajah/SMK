import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '@/constants/config';
import { globalState } from './_globalState';

export default function NotificationsScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaksi`, {
        headers: {
          'Authorization': `Bearer ${globalState.token}`
        }
      });
      const json = await response.json();
      
      if (json.data) {
        const isManagement = globalState.role === 'ROLE_ADMIN' || globalState.role === 'ROLE_OWNER';

        // Generate dynamic notifications based on transaction data & role
        const dynamicNotifs = json.data.map((t: any) => {
          if (t.statusBayar === 'MENUNGGU') {
            return {
              id: `notif-${t.idTransaksi}`,
              title: isManagement ? 'Perlu Verifikasi Pembayaran' : 'Tagihan Belum Dibayar',
              description: isManagement 
                ? `Ada transaksi baru untuk Kamar ${t.kamar?.nomorKamar || ''} yang menunggu verifikasi.` 
                : `Kamar ${t.kamar?.nomorKamar || ''} menunggu pembayaran sebesar Rp ${(t.hargaDeal || 0).toLocaleString('id-ID')}.`,
              time: t.tanggalTransaksi || 'Baru saja',
              type: 'payment',
              isRead: false
            };
          } else if (t.statusBayar === 'LUNAS') {
            return {
              id: `notif-${t.idTransaksi}`,
              title: isManagement ? 'Transaksi Selesai' : 'Pembayaran Berhasil',
              description: isManagement
                ? `Pembayaran untuk Kamar ${t.kamar?.nomorKamar || ''} telah diverifikasi dan lunas.`
                : `Sewa Kamar ${t.kamar?.nomorKamar || ''} telah lunas. Terima kasih!`,
              time: t.tanggalTransaksi || 'Baru saja',
              type: 'success',
              isRead: true
            };
          }
          return null;
        }).filter((n: any) => n !== null);

        setNotifications(dynamicNotifs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment': return { name: 'payment', color: '#ba1a1a', bg: '#ffdad6' };
      case 'success': return { name: 'check-circle', color: '#386a20', bg: '#b7f397' };
      default: return { name: 'info', color: '#3525cd', bg: '#e0e0ff' };
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'left', 'right']}>
      {/* Header */}
      <View className="px-6 py-4 flex-row items-center border-b border-outline-variant/30">
        <TouchableOpacity onPress={() => router.back()} className="mr-4 p-2 -ml-2">
          <MaterialIcons name="arrow-back" size={24} color="#1b1b1f" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-on-surface">Notifikasi</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="p-4 gap-4">
          {loading ? (
            <View className="py-20 items-center">
              <ActivityIndicator size="large" color="#3525cd" />
              <Text className="mt-4 text-outline">Memuat notifikasi...</Text>
            </View>
          ) : notifications.length > 0 ? (
            notifications.map((item) => {
              const icon = getIcon(item.type);
              return (
                <TouchableOpacity
                  key={item.id}
                  className={`p-4 rounded-2xl flex-row gap-4 border ${item.isRead ? 'bg-surface border-outline-variant/30' : 'bg-primary-container/10 border-primary/20 shadow-sm'}`}
                >
                  <View 
                    style={{ backgroundColor: icon.bg }}
                    className="w-12 h-12 rounded-full items-center justify-center"
                  >
                    <MaterialIcons name={icon.name as any} size={24} color={icon.color} />
                  </View>
                  
                  <View className="flex-1">
                    <View className="flex-row justify-between items-start mb-1">
                      <Text className={`text-base ${item.isRead ? 'font-semibold text-on-surface' : 'font-bold text-primary'}`}>
                        {item.title}
                      </Text>
                      {!item.isRead && <View className="w-2 h-2 rounded-full bg-primary mt-1.5" />}
                    </View>
                    <Text className="text-sm text-on-surface-variant leading-5 mb-2">
                      {item.description}
                    </Text>
                    <Text className="text-xs text-outline">
                      {item.time}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View className="py-20 items-center">
              <MaterialIcons name="notifications-none" size={64} color="#777587" />
              <Text className="mt-4 text-lg font-bold text-on-surface-variant">Belum Ada Notifikasi</Text>
              <Text className="text-outline text-center px-10">Semua info terbaru akan muncul di sini.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

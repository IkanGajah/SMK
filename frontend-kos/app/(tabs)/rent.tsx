import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Data Dummy My Rent
const RENT_DATA = [
  {
    id: 'rent1',
    roomName: 'Kamar 101',
    roomType: 'Premium Suite A',
    price: 'Rp 4.5M',
    status: 'LUNAS',
    startDate: 'Oct 1, 2023',
    duration: '6 months',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKBiQD6zpgWN9HUPTHSLj3zumHnWSr6VQY3D8vuqF3J3lQ3I2fMJz76EeJ-8gTTsFC24ak4-I-HCeeXOuMZL789ihF8TvIc8pTI8e_65rNLzLfnD9Ts3cBpk_32v9mNvO-yMZFv9_30qUqJhq0o_UoT9t8MnXiypQpX3RegxeXKUiH9ajl2b4ioJSP9CQM1SwF7YcU2tVZvtZPgW739WCceOJyqmK_Hfjc1C66pKWHxZI4A1UNYDRuu06qdCigAXLE6EQHR_Hf_aU'
  },
  {
    id: 'rent2',
    roomName: 'Kamar 205',
    roomType: 'Standard Room B',
    price: 'Rp 3.2M',
    status: 'MENUNGGU',
    startDate: 'Jan 15, 2024',
    duration: '12 months',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJIJwwGlRhmQQ51_yObxOt9uKzi7T_ii3kMMMWuTpvW6rLE-7ZmvokB9sDlA0YTAy3IvIfS3fWWfkrXyNIomGAZZ0VanDy8upTDU23MEXtreOOHFXF1lCoPT5-z4hVtc4JtcwKChBnNAp-oTNvBGNMXxKmsPhqY1yNskdnxXRAtiYudFHLtfCq-n4ZskGZAg1JbPdzdCMIZDuK_ltFi3lmx-GY9_VOHEjyJleIll-pLAC2KLbWDSaEmgnAc6Vq3AO3I_Ko0_gmL7U'
  }
];

export default function RentScreen() {
  const [activeTab, setActiveTab] = useState<'Active' | 'Past'>('Active');

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-4">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq3zffhJf_sFwHkIq6HdIMjfJkYq10922SDwZTXhixnHBxv70hGOdvLONw2Hs-DH6Hg_HL1aTujWIC5oJ_A2frlyNH3lzSDRXQH2hxvH9juTikNHNZScAKI-KH-o1HzX5u_wJ39YD9mWTDqpJKhekb72lJwB51E2waYeHZIoGyLWFbaagYLsrX7UdwnCHdUzRpmYpKupD9ms10f2bZFKNT6JdkZBHDMSnUQj-sqViW4bAUGLjDXECysEtaaKF704fHo4QwSpUczHY' }}
            className="w-10 h-10 rounded-full bg-surface-container-high"
          />
          <Text className="text-primary font-black uppercase tracking-widest text-sm">The Estate</Text>
        </View>

        <TouchableOpacity className="hover:opacity-80 active:scale-95">
          <MaterialIcons name="notifications" size={24} color="#3525cd" />
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
          <Text className="text-[15px] text-outline mt-2">Manage your current and past property rentals.</Text>
        </View>

        {/* Filters */}
        <View className="flex-row gap-2 mb-8 bg-surface-container-low p-1.5 rounded-xl self-start">
          <TouchableOpacity 
            onPress={() => setActiveTab('Active')}
            className={`px-6 py-2 rounded-lg shadow-sm ${activeTab === 'Active' ? 'bg-surface-container-lowest' : 'bg-transparent'}`}
          >
            <Text className={`font-medium text-sm ${activeTab === 'Active' ? 'text-primary' : 'text-on-surface-variant'}`}>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setActiveTab('Past')}
            className={`px-6 py-2 rounded-lg ${activeTab === 'Past' ? 'bg-surface-container-lowest shadow-sm' : 'bg-transparent'}`}
          >
            <Text className={`font-medium text-sm ${activeTab === 'Past' ? 'text-primary' : 'text-on-surface-variant'}`}>Past</Text>
          </TouchableOpacity>
        </View>

        {/* List Section */}
        <View className="gap-8">
          {RENT_DATA.map((item) => (
            <TouchableOpacity 
              key={item.id}
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
                <Text className="text-xs text-outline ml-1 mt-1">/mo</Text>
              </View>

              {/* Content Side */}
              <View className="w-2/3 pl-12 pr-4 py-5 justify-between">
                
                <View className="flex-row justify-between items-start">
                  <View className="flex-1 mr-2">
                    <Text className="font-bold text-[22px] text-on-surface leading-none" numberOfLines={1}>{item.roomName}</Text>
                    <Text className="text-sm text-outline mt-1" numberOfLines={1}>{item.roomType}</Text>
                  </View>
                  
                  {/* Status Badge */}
                  <View className={`px-2.5 py-1 rounded-full ${item.status === 'LUNAS' ? 'bg-secondary-container' : 'bg-tertiary-container'}`}>
                    <Text className={`text-[9px] font-bold uppercase tracking-wider ${item.status === 'LUNAS' ? 'text-on-secondary-container' : 'text-on-tertiary-container'}`}>
                      {item.status}
                    </Text>
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
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

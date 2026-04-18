import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function OwnerOverviewScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <Text className="font-black text-xl text-indigo-700 tracking-tight">The Estate Owner</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full overflow-hidden active:scale-95 bg-surface-container-highest">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTu0xXNmoLq8UvQ96ylhzhMBb8qjIEbLQ6y0N2sPWSHaeMZ2tHX2e277Knu9YPgud9_tI2cJPwVyljlX6491OQi4DTouEeHdHHwfsi3tQbzo5zPGl0z3i1RNZoFWq3sCKrZgMkKg-e9aHgaHKQ-iEHca93Ta6LIJZTsN66E_BcR75OU85FyIRy4Y-47sa9XAGzEnLStW3vzPpa-5xqBoeNdZLJ6eTwSNTQ_rywYzKtp9vaFxx5jxZmxLauOgLrmIHNyGyHgA9Az9g' }}
            className="w-full h-full object-cover"
          />
        </TouchableOpacity>
      </View>
      <View className="bg-surface-container-high/50 h-[1px] w-full" />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }} // Space for Bottom Nav
        className="px-6 flex-1 mt-4"
      >
        
        {/* Page Header */}
        <View className="mb-6">
          <Text className="font-black text-[28px] text-on-surface tracking-tight">Portfolio Overview</Text>
          <Text className="text-on-surface-variant mt-2 text-base">High-level metrics across all properties.</Text>
        </View>

        {/* High-Level Metrics (Bento Grid) */}
        <View className="flex-col gap-4 mb-8">
          
          {/* Revenue */}
          <View className="rounded-xl overflow-hidden shadow-sm relative">
            <LinearGradient
              colors={['#4f46e5', '#3525cd']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              className="p-6"
            >
              <View className="absolute top-[-20px] right-[-20px] opacity-20">
                <MaterialIcons name="account-balance-wallet" size={120} color="#ffffff" />
              </View>
              
              <View className="flex-row justify-between items-start mb-6 relative z-10">
                <Text className="font-semibold text-white/80 text-base">Total Revenue (MTD)</Text>
                <MaterialIcons name="trending-up" size={24} color="#ffffff" />
              </View>
              <View className="relative z-10">
                <Text className="text-[32px] font-extrabold tracking-tight text-white">$142,500</Text>
                <Text className="text-sm mt-1 text-white/80">+8.4% vs last month</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Occupancy */}
          <View className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 shadow-sm flex-col justify-between">
            <View className="flex-row justify-between items-start mb-6">
              <Text className="font-semibold text-on-surface-variant text-base">Global Occupancy Rate</Text>
              <MaterialIcons name="hotel" size={24} color="#464555" />
            </View>
            <View>
              <Text className="text-[32px] font-extrabold text-on-surface">88%</Text>
              <View className="w-full bg-surface-container mt-3 h-2 rounded-full overflow-hidden">
                <View className="bg-[#006b5f] h-full w-[88%] rounded-full" />
              </View>
              <Text className="text-sm mt-2 text-on-surface-variant">420 / 475 Units Filled</Text>
            </View>
          </View>

          {/* Maintenance */}
          <View className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 shadow-sm flex-col justify-between">
            <View className="flex-row justify-between items-start mb-6">
              <Text className="font-semibold text-on-surface-variant text-base">Maintenance Costs</Text>
              <MaterialIcons name="plumbing" size={24} color="#464555" />
            </View>
            <View>
              <Text className="text-[24px] font-extrabold text-on-surface">$12,450</Text>
              <View className="flex-row items-center gap-2 mt-2">
                <View className="bg-[#ffdad6] px-2 py-1 rounded-full flex-row items-center gap-1">
                  <MaterialIcons name="arrow-upward" size={14} color="#93000a" />
                  <Text className="text-xs font-semibold text-[#93000a]">12%</Text>
                </View>
                <Text className="text-sm text-on-surface-variant">vs average</Text>
              </View>
            </View>
          </View>

        </View>

        {/* Occupancy by Branch */}
        <View className="mb-8 flex-col gap-4">
          <View className="flex-row justify-between items-end">
            <Text className="font-bold text-[22px] text-on-surface">Occupancy by Branch</Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="text-primary text-sm font-semibold">View All</Text>
              <MaterialIcons name="chevron-right" size={16} color="#3525cd" />
            </TouchableOpacity>
          </View>
          
          <View className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/20 shadow-sm flex-col gap-6">
            
            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="font-semibold text-on-surface">The Continental - Central</Text>
                <Text className="font-semibold text-on-surface">95%</Text>
              </View>
              <View className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                <View className="bg-primary h-full w-[95%] rounded-full" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="font-semibold text-on-surface">Oasis West</Text>
                <Text className="font-semibold text-on-surface">82%</Text>
              </View>
              <View className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                <View className="bg-primary h-full w-[82%] rounded-full" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="font-semibold text-on-surface">Riverfront Suites</Text>
                <Text className="font-semibold text-[#ba1a1a]">65%</Text>
              </View>
              <View className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                <View className="bg-[#ba1a1a] h-full w-[65%] rounded-full" />
              </View>
            </View>

            <View>
              <View className="flex-row justify-between mb-2">
                <Text className="font-semibold text-on-surface">Highland Park Towers</Text>
                <Text className="font-semibold text-on-surface">100%</Text>
              </View>
              <View className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
                <View className="bg-[#006b5f] h-full w-[100%] rounded-full" />
              </View>
            </View>

          </View>
        </View>

        {/* Urgent Alerts */}
        <View className="flex-col gap-4">
          <Text className="font-bold text-[22px] text-on-surface">Urgent Alerts</Text>
          <View className="bg-surface-container-low rounded-xl p-4 flex-col gap-4">
            
            <View className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border-l-4 border-[#ba1a1a] flex-row gap-4 items-start">
              <View className="bg-[#ffdad6] p-2 rounded-full mt-1">
                <MaterialIcons name="warning" size={20} color="#93000a" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-on-surface text-sm">Low Occupancy Alert</Text>
                <Text className="text-xs text-on-surface-variant mt-1">Riverfront Suites has dropped below 70% occupancy target.</Text>
              </View>
            </View>

            <View className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border-l-4 border-[#3d37a9] flex-row gap-4 items-start">
              <View className="bg-[#dbd7ff] p-2 rounded-full mt-1">
                <MaterialIcons name="water-damage" size={20} color="#0f0069" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-on-surface text-sm">Critical Maintenance</Text>
                <Text className="text-xs text-on-surface-variant mt-1">Major plumbing issue reported at The Continental - Unit 402.</Text>
              </View>
            </View>

            <View className="bg-surface-container-lowest p-4 rounded-lg shadow-sm border-l-4 border-[#777587] flex-row gap-4 items-start">
              <View className="bg-[#e0e3e5] p-2 rounded-full mt-1">
                <MaterialIcons name="payments" size={20} color="#464555" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-on-surface text-sm">Pending Renewals</Text>
                <Text className="text-xs text-on-surface-variant mt-1">12 leases expiring in the next 30 days across all branches.</Text>
              </View>
            </View>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

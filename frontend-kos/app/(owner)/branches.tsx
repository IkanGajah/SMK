import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Data Dummy
const BRANCHES_DATA = [
  {
    id: 'b1',
    name: 'Senayan Estate',
    location: 'South Jakarta',
    rooms: '45',
    totalRooms: '50',
    occupancy: '90%',
    status: 'High Vacancy',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJtXQNurNOdXRA1dgEN2NwUpdZsEQtl9IzcDXZLR3ID0kMyNi_wXbGAe7j5F5hUDZ2sFTRdC_IkeYvaQSCPR_SxpMxgUDUPqFKgv5z0TTrljQL91aw1O4d4n7RxJLWEOyu5mRLbShr7k6L235lEL08WDjjm9LN2Vr08qs55zj2kUMhMXCwdHihV4wO9n-jv44ZJrXLns_dRvedckCdiyHG98TbTzwQmAJOW9MybLddYdTiTa9ITJ3kyBkNkMHArTSR6xgqC-riuwg'
  },
  {
    id: 'b2',
    name: 'Bintaro Heights',
    location: 'South Tangerang',
    rooms: '120',
    totalRooms: '120',
    occupancy: '100%',
    status: 'Fully Booked',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArJ3Y32MypzyU4itQBMLwYFti_nuFapF_9d1CEDG0UD06OC-Bf61NyWcOYlUIMhMPeiZFcNek7i6HHeOObBftgceVXpYQr7lGxeSXpNKR87nQOoK8zTvipmbQCr2TYYnInQ_83SHQ1xEQFil2GNlWLs40-TA0xg3BSsAY1kjyyaQW1xz2OIZEGsUx8K_4PuZTyrlvAHOVOlDEarLexoM0thrLZomYErq613XnDNF4v0EASdZkRG-peMMOCMm9xL_vUK5aDNkaH_LU'
  },
  {
    id: 'b3',
    name: 'Kemang Residences',
    location: 'South Jakarta',
    rooms: '78',
    totalRooms: '85',
    occupancy: '91%',
    status: 'Stable',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNA5lWY5U9S1jBaSpFzZjQP6dWv7ZEtXQJi9UnYQIKhl_1DrIwK5v6VY5zV7lmbVD818QW8z5JlK0BnUhqzpS2F-S41Vc6t8BMwAbGMCNKGCWrekE_9QNhX4BbTTDMRJucVm7riBeQ8Oa_muDfYUNqnfzLiCzdvehI8Rxerbh3bFzZ270nCwFwDEHzuu72iSHLVCHOM0KB2mmNYm-TEwHaSOaWQwGlZ4qTq7ktPG2DH0nYonATvwkogGqPs1Tym97DE2z19rkKAV0'
  }
];

export default function OwnerBranchesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <Text className="font-black text-xl text-on-surface tracking-tight">The Estate Owner</Text>
        <TouchableOpacity className="w-10 h-10 rounded-full overflow-hidden active:scale-95 bg-surface-container-highest">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcXN5dGF30EebDCNTBrIHPcLL84BSyR9_AXcp2q2j41QolrkTLVVQuQdMCuaN395rzXAhef5I2OrQv5rBGGgsm0O0dAaJOtyLuC-1oisPXf9OJiJcmWIQxmbXV7BilWeQ57pkM3AHFvKYx06u3Jir3peUV4WVa7Hz121Y0Z7qyaRpcfla1DVPxHTtcte7_p45i-6S2EI3B_AHREJWUBNSLENFRq8-NrB83FTqVqSVQ_q31mCDOK9pxaYgMEnMBThNaI0B-DIP4f84' }}
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
        <View className="mb-6 flex-col gap-4">
          <View>
            <Text className="font-black text-[28px] text-on-surface leading-tight tracking-tight">Property Branches</Text>
            <Text className="text-[15px] text-on-surface-variant mt-2">Manage your estate portfolio and monitor occupancy rates across all locations.</Text>
          </View>
          <TouchableOpacity className="h-[52px] rounded-xl flex-row items-center justify-center gap-2 shadow-sm active:scale-95 overflow-hidden">
            <LinearGradient
              colors={['#4f46e5', '#3525cd']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              className="w-full h-full flex-row items-center justify-center gap-2"
            >
              <MaterialIcons name="add" size={20} color="#ffffff" />
              <Text className="text-white font-semibold text-[15px]">Add New Branch</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Branches Grid */}
        <View className="flex-col gap-6">
          {BRANCHES_DATA.map((branch) => (
            <View key={branch.id} className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/20 flex-col">
              
              {/* Image Section */}
              <View className="h-48 relative overflow-hidden bg-surface-container-highest">
                <Image 
                  source={{ uri: branch.image }} 
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient overlay for better text visibility if pill overlaps */}
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.5)']}
                  className="absolute bottom-0 left-0 w-full h-1/2"
                />

                {/* Status Pill Overlap (positioned at bottom left of image) */}
                <View className={`absolute bottom-3 left-4 px-3 py-1 rounded-full flex-row items-center gap-1.5 shadow-sm ${
                  branch.status === 'High Vacancy' ? 'bg-[#ffdad6]' :
                  branch.status === 'Fully Booked' ? 'bg-[#d1f4e0]' : 'bg-[#dbd7ff]'
                }`}>
                  <View className={`w-2 h-2 rounded-full ${
                    branch.status === 'High Vacancy' ? 'bg-[#ba1a1a]' :
                    branch.status === 'Fully Booked' ? 'bg-[#128042]' : 'bg-[#3525cd]'
                  }`} />
                  <Text className={`text-xs font-semibold ${
                    branch.status === 'High Vacancy' ? 'text-[#93000a]' :
                    branch.status === 'Fully Booked' ? 'text-[#0d592e]' : 'text-[#0f0069]'
                  }`}>
                    {branch.status}
                  </Text>
                </View>
              </View>

              {/* Content Section */}
              <View className="p-6 flex-col">
                <View>
                  <Text className="font-black text-[22px] text-on-surface">{branch.name}</Text>
                  <View className="flex-row items-center gap-1 mt-1">
                    <MaterialIcons name="location-on" size={16} color="#464555" />
                    <Text className="text-[15px] text-on-surface-variant">{branch.location}</Text>
                  </View>
                </View>

                <View className="flex-row gap-4 mt-6 mb-6">
                  <View className="flex-1 bg-surface-container-low p-3 rounded-xl">
                    <Text className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Rooms</Text>
                    <Text className="font-extrabold text-[20px] text-on-surface">
                      {branch.rooms}<Text className="text-sm font-normal text-on-surface-variant ml-1">/ {branch.totalRooms}</Text>
                    </Text>
                  </View>
                  <View className="flex-1 bg-surface-container-low p-3 rounded-xl">
                    <Text className="text-xs text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">Occupancy</Text>
                    <Text className="font-extrabold text-[20px] text-on-surface">{branch.occupancy}</Text>
                  </View>
                </View>

                <TouchableOpacity className="w-full h-[52px] rounded-xl bg-[#6df5e1] active:bg-[#4fdbc8] flex-row items-center justify-center gap-2">
                  <MaterialIcons name="settings" size={20} color="#006f64" />
                  <Text className="text-[#006f64] font-semibold text-[15px]">Manage Branch</Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Data Dummy
const TENANTS_DATA = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    room: 'Room 402',
    rentAmount: '$2,450',
    nextDue: 'Oct 15, 2023',
    status: 'Due in 2 days',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUSpHpqp_IK08hzUC9aurp4ohAdLHid1zMql9qOq7eS_xOH1Cx5C17g6V6qDURgWpbC_V3XyM0A6NXRM7Zkm_RC335P3kEyu_WK3aByq7BbYphJdXqL6mg_TnPwrnk8rW6ab2SEghhikiApaWEHY_kyo0MXeL03QlrgymyYvcj9WrHJPFcwmUW7Nt-BqeASEUor5HJhelzoyBHOaJbtjUbzL9OMkm5VsTyBvzMIt8S2YGvC6WmuLbWC5nbcxgqm87eVSrh2mGQbyg',
    initials: null
  },
  {
    id: 't2',
    name: 'Marcus Chen',
    room: 'Room 215',
    rentAmount: '$1,850',
    nextDue: 'Nov 01, 2023',
    status: 'Paid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDothIm5VuZFGFc_m1ksWUimpsfPeIjBQ6frPbNU9JSZjdhUrI2A3kWicF6QQH2lnoDSzQcV68kHRkpvO7duq8pATAsaI9nHzkoTJk6xIFMg4iIj5Mi0BfL5h8ZEhMB1L1am2WiXdl1tKFJoLOrO9s343I_MLHKk2NfvN7DpYiNfLUOXs5NfYjBFjL_-5Gmw8YKOU1rlQmUwPK2rlHsnQNKKFkbfOj_9z1B1ENjSVYps7xasrX5HXiwgi8h0No8SVo1bg8jtfTILyg',
    initials: null
  },
  {
    id: 't3',
    name: 'Sarah Jenkins',
    room: 'Room 501',
    rentAmount: '$3,200',
    nextDue: 'Oct 28, 2023',
    status: 'New',
    image: null,
    initials: 'SJ'
  }
];

export default function AdminTenantsScreen() {
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
          {TENANTS_DATA.map((tenant, index) => (
            <View key={tenant.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 overflow-hidden relative">
              
              {/* Accents for different statuses */}
              {tenant.status.includes('Due') && (
                <LinearGradient
                  colors={['#4f46e5', '#006b5f']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  className="absolute top-0 left-0 w-full h-1"
                />
              )}
              {tenant.status === 'New' && (
                <View className="absolute top-0 right-0 w-24 h-24 bg-[#6df5e1]/20 rounded-bl-full -mr-4 -mt-4" />
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
                  tenant.status.includes('Due') ? 'bg-[#ffdad6]' :
                  tenant.status === 'Paid' ? 'bg-[#e6e8ea]' : 'bg-[#e2dfff]/50'
                }`}>
                  {tenant.status === 'Paid' && <MaterialIcons name="check-circle" size={14} color="#464555" />}
                  <Text className={`text-[12px] font-semibold tracking-wide ${
                    tenant.status.includes('Due') ? 'text-[#93000a]' :
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
                  <Text className="text-[11px] text-on-surface-variant font-semibold uppercase tracking-wider mb-1">Next Due</Text>
                  <Text className="font-semibold text-[15px] text-on-surface">{tenant.nextDue}</Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-3">
                <TouchableOpacity className={`flex-1 h-[44px] rounded-xl flex-row items-center justify-center gap-2 active:scale-95 ${
                  tenant.status.includes('Due') ? 'bg-[#6df5e1]' : 'bg-surface-container'
                }`}>
                  <MaterialIcons name="chat" size={20} color={tenant.status.includes('Due') ? '#006f64' : '#191c1e'} />
                  <Text className={`font-semibold ${tenant.status.includes('Due') ? 'text-[#006f64]' : 'text-on-surface'}`}>Message</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="w-[44px] h-[44px] rounded-xl border border-outline-variant/20 items-center justify-center bg-surface-container-lowest active:scale-95">
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

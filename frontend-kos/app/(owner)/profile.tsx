import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Switch
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function OwnerProfileScreen() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-surface pt-4" edges={['top', 'left', 'right']}>
      
      {/* Top App Bar */}
      <View className="px-6 pb-4 flex-row justify-between items-center z-50">
        <View className="flex-row items-center gap-2">
          <Text className="font-black text-xl text-indigo-700 tracking-tight">KosKu</Text>
          <Text className="font-black text-lg text-on-surface tracking-tight">The Estate Owner</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 rounded-full overflow-hidden active:scale-95 bg-surface-container-highest">
          <Image 
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCBwMq9JRmYakgO8zcYuxTMopLW1J-rcTRfTOj0W0sJfLWiKcN4hJ2wO9EgNlWlfLs4nAp3KXZBruqhX4uejh4hIujqS4q2AFIQRG3Hp3R4boOoyjw80chN8XH7JDq2Buvtg7yY-s-vjFSBx3sbTFkPcduzvOeE6o1uTsJfC-jxlSE4TdFlj2uevzk7YtlZovwFw7A_jT3Y79WXcOSuTeE5qZBGPDjnVUsdy5OByEEMzaVSzJ1Obp8_6g4gK_7TIrrhyG8HGmYcZzs' }}
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
        
        {/* Profile Header Bento */}
        <View className="flex-col gap-6 mb-8">
          
          {/* Identity Card */}
          <View className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/20 relative overflow-hidden items-center text-center">
            {/* Background Accent */}
            <LinearGradient
              colors={['rgba(79, 70, 229, 0.1)', 'transparent']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              className="absolute inset-0"
            />
            
            <TouchableOpacity className="absolute top-4 right-4 w-10 h-10 items-center justify-center rounded-full bg-surface-container-low active:bg-surface-container z-20">
              <MaterialIcons name="edit" size={20} color="#464555" />
            </TouchableOpacity>

            <View className="w-28 h-28 rounded-full overflow-hidden border-4 border-surface-container-lowest shadow-sm mb-4">
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD48g8MkeYJ9BfOCPURzFiaLhlmBflJsuYUk6OY8nBmuTD0Zf6BZ1nLyTVJI02LZBdxcEeSF0M93Pnf-Cxeh4PBdfGJfoCcGA8KpbHx787rYxKAKJZWf9FwHrbhEwnLejqf5YVBQgyDFYdReE-fRSM8WKYvRhtnPga96f2z7u7hA0ZRTf75PnQGs_A1OndQOph2Eu_R4LDfQg4WBPFygHVMB3wZDlghSuRO8vuvnKOWQvOnHAlS1HLJihENgjY5N4xHzgp_iibivZE' }}
                className="w-full h-full object-cover"
              />
            </View>

            <Text className="font-black text-[28px] text-on-surface mb-1">Richard Henderson</Text>
            <Text className="text-[#3525cd] font-medium text-base mb-4">Property Owner</Text>

            <View className="flex-col w-full gap-3 mt-2">
              <View className="flex-row items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-low">
                <MaterialIcons name="mail" size={18} color="#464555" />
                <Text className="text-sm font-medium text-on-surface-variant">richard.h@estate.com</Text>
              </View>
              <View className="flex-row items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-low">
                <MaterialIcons name="phone" size={18} color="#464555" />
                <Text className="text-sm font-medium text-on-surface-variant">+1 (555) 123-4567</Text>
              </View>
            </View>
          </View>

          {/* Quick Stats */}
          <View className="rounded-xl overflow-hidden shadow-sm">
            <LinearGradient
              colors={['#4f46e5', '#3525cd']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              className="p-8 items-start relative"
            >
              <View className="absolute top-[-30px] right-[-30px] w-40 h-40 bg-[#4f46e5] rounded-full opacity-50" />
              
              <Text className="text-xs font-semibold text-[#c3c0ff] uppercase tracking-wider mb-2">Active Portfolio</Text>
              <Text className="font-black text-[40px] text-white leading-tight">12</Text>
              <Text className="text-sm text-[#c3c0ff] mt-1">Properties Managed</Text>
            </LinearGradient>
          </View>

        </View>

        {/* Settings Grid */}
        <View className="flex-col gap-8">
          
          {/* Security Settings */}
          <View className="bg-surface-container-low rounded-xl p-6">
            <View className="flex-row items-center gap-2 mb-6">
              <MaterialIcons name="security" size={24} color="#3525cd" />
              <Text className="font-bold text-[22px] text-on-surface">Security Settings</Text>
            </View>

            <View className="flex-col gap-4">
              
              {/* Password */}
              <TouchableOpacity className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center justify-between border border-outline-variant/15 active:scale-95 shadow-sm">
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-surface-container-low items-center justify-center">
                    <MaterialIcons name="password" size={20} color="#464555" />
                  </View>
                  <View>
                    <Text className="font-semibold text-[15px] text-on-surface">Change Password</Text>
                    <Text className="text-sm text-on-surface-variant">Last updated 3 months ago</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#3525cd" />
              </TouchableOpacity>

              {/* 2FA */}
              <View className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center justify-between border border-outline-variant/15 shadow-sm">
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-surface-container-low items-center justify-center">
                    <MaterialIcons name="phonelink-lock" size={20} color="#464555" />
                  </View>
                  <View>
                    <Text className="font-semibold text-[15px] text-on-surface">Two-Factor Authentication</Text>
                    <Text className="text-sm text-on-surface-variant">Currently {is2FAEnabled ? 'enabled' : 'disabled'}</Text>
                  </View>
                </View>
                <Switch 
                  value={is2FAEnabled} 
                  onValueChange={setIs2FAEnabled}
                  trackColor={{ false: '#e0e3e5', true: '#4f46e5' }}
                  thumbColor="#ffffff"
                />
              </View>

              {/* Sessions */}
              <TouchableOpacity className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center justify-between border border-outline-variant/15 active:scale-95 shadow-sm">
                <View className="flex-row items-center gap-4">
                  <View className="w-10 h-10 rounded-full bg-surface-container-low items-center justify-center">
                    <MaterialIcons name="devices" size={20} color="#464555" />
                  </View>
                  <View>
                    <Text className="font-semibold text-[15px] text-on-surface">Active Sessions</Text>
                    <Text className="text-sm text-on-surface-variant">Manage logged in devices</Text>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#3525cd" />
              </TouchableOpacity>

            </View>
          </View>

          {/* Subscription & Billing */}
          <View className="bg-surface-container-low rounded-xl p-6">
            <View className="flex-row items-center gap-2 mb-6">
              <MaterialIcons name="credit-card" size={24} color="#3525cd" />
              <Text className="font-bold text-[22px] text-on-surface">KosKu Subscription</Text>
            </View>

            {/* Active Plan Card */}
            <View className="bg-surface-container-lowest rounded-xl p-6 border border-[#3525cd]/20 relative overflow-hidden mb-4 shadow-sm">
              <View className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-[#6df5e1] rounded-full opacity-20" />
              
              <View className="flex-row justify-between items-start mb-6">
                <View>
                  <View className="px-3 py-1 bg-[#4f46e5]/10 rounded-full self-start mb-2">
                    <Text className="text-[#3525cd] text-[10px] font-bold uppercase tracking-wider">Current Plan</Text>
                  </View>
                  <Text className="font-bold text-[18px] text-on-surface">Estate Enterprise</Text>
                </View>
                <View className="items-end">
                  <Text className="font-extrabold text-[20px] text-on-surface tracking-tight">$299<Text className="text-sm font-normal text-on-surface-variant">/mo</Text></Text>
                </View>
              </View>

              <View className="flex-col gap-3 mb-6">
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="check-circle" size={20} color="#006b5f" />
                  <Text className="text-sm text-on-surface">Up to 50 properties</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="check-circle" size={20} color="#006b5f" />
                  <Text className="text-sm text-on-surface">Advanced financial reporting</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <MaterialIcons name="check-circle" size={20} color="#006b5f" />
                  <Text className="text-sm text-on-surface">Priority concierge support</Text>
                </View>
              </View>

              <View className="pt-4 border-t border-surface-container-highest flex-row items-center justify-between">
                <Text className="text-sm text-on-surface-variant">Next billing: <Text className="font-bold text-on-surface">Oct 15, 2023</Text></Text>
                <TouchableOpacity>
                  <Text className="text-[#3525cd] font-semibold text-sm">Manage Plan</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Method */}
            <View className="bg-surface-container-lowest rounded-xl p-4 flex-row items-center justify-between border border-outline-variant/15 shadow-sm">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-8 bg-surface-container-highest rounded border border-outline-variant/30 items-center justify-center">
                  <Text className="font-bold text-[10px] text-on-surface-variant">VISA</Text>
                </View>
                <View>
                  <Text className="font-semibold text-[15px] text-on-surface">•••• •••• •••• 4242</Text>
                  <Text className="text-sm text-on-surface-variant">Expires 12/25</Text>
                </View>
              </View>
              <TouchableOpacity className="w-8 h-8 items-center justify-center">
                <MaterialIcons name="edit" size={20} color="#3525cd" />
              </TouchableOpacity>
            </View>

          </View>

        </View>

        {/* Danger Zone */}
        <View className="mt-12 mb-4 flex-row justify-center">
          <TouchableOpacity className="h-[52px] px-8 rounded-xl bg-[#ffdad6] flex-row items-center gap-2 active:bg-[#ffdad6]/80 shadow-sm">
            <MaterialIcons name="logout" size={20} color="#93000a" />
            <Text className="text-[#93000a] font-semibold">Sign Out of KosKu</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

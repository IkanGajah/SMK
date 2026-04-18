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

export default function OwnerReportsScreen() {
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
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFx78PZzeZlsNCPvgAs0bru3ziCqnMB4btVo-jTywfU7IZj4iSJn9YWbXNp1QwRA6PGyRATeny2pnkNVt0bysHOkvOB51nLE1Eu7fyWQPP7nfc9jSqyoS2LLhRX5WNPgmD1V4jpk6kELYG9sw0hJpNpZTTz6_jrNTi3u-kNYzoF7672MiDcBjpcREFzzlIPFL5NnfS-EbPP9NaivJBidI9QmjS4rl-jZ_1La5XvjiN0SSh_vXcDBXWV4p61p-lUZ6TnU2i2w75cAo' }}
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
        <View className="mb-8">
          <Text className="font-black text-[28px] text-on-surface tracking-tight">Financial Reports</Text>
          <Text className="text-on-surface-variant mt-2 text-[15px]">Comprehensive overview of estate performance and analytics.</Text>
        </View>

        {/* Metric Cards */}
        <View className="flex-col gap-6 mb-8">
          
          {/* Total Revenue */}
          <View className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden shadow-sm border border-outline-variant/20">
            <View className="flex-row justify-between items-start mb-4">
              <Text className="text-[15px] text-on-surface-variant">Total Revenue</Text>
              <MaterialIcons name="account-balance-wallet" size={24} color="#4f46e5" />
            </View>
            <Text className="font-extrabold text-[20px] text-on-surface tracking-tight">Rp 124,500,000</Text>
            <View className="mt-2 flex-row items-center">
              <MaterialIcons name="arrow-upward" size={16} color="#006b5f" />
              <Text className="text-[#006b5f] font-semibold text-sm ml-1">12.5%</Text>
              <Text className="text-on-surface-variant text-xs ml-2">vs last month</Text>
            </View>
          </View>

          {/* Total Expenses */}
          <View className="bg-surface-container-lowest rounded-xl p-6 relative overflow-hidden shadow-sm border border-outline-variant/20">
            <View className="flex-row justify-between items-start mb-4">
              <Text className="text-[15px] text-on-surface-variant">Total Expenses</Text>
              <MaterialIcons name="receipt-long" size={24} color="#ba1a1a" />
            </View>
            <Text className="font-extrabold text-[20px] text-on-surface tracking-tight">Rp 32,150,000</Text>
            <View className="mt-2 flex-row items-center">
              <MaterialIcons name="arrow-upward" size={16} color="#ba1a1a" />
              <Text className="text-[#ba1a1a] font-semibold text-sm ml-1">4.2%</Text>
              <Text className="text-on-surface-variant text-xs ml-2">vs last month</Text>
            </View>
          </View>

          {/* Net Profit */}
          <View className="rounded-xl overflow-hidden shadow-sm">
            <LinearGradient
              colors={['#4f46e5', '#3525cd']}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
              className="p-6 relative"
            >
              <View className="flex-row justify-between items-start mb-4">
                <Text className="text-[15px] text-white/80">Net Profit</Text>
                <MaterialIcons name="trending-up" size={24} color="#ffffff" />
              </View>
              <Text className="font-extrabold text-[20px] text-white tracking-tight">Rp 92,350,000</Text>
              <View className="mt-2 flex-row items-center">
                <MaterialIcons name="arrow-upward" size={16} color="#6df5e1" />
                <Text className="text-[#6df5e1] font-semibold text-sm ml-1">15.8%</Text>
                <Text className="text-white/70 text-xs ml-2">vs last month</Text>
              </View>
            </LinearGradient>
          </View>

        </View>

        {/* Charts Section */}
        <View className="flex-col gap-6 mb-8">
          
          {/* Revenue Trends Placeholder */}
          <View className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="font-bold text-[18px] text-on-surface">Revenue Trends</Text>
              <View className="bg-surface-container px-3 py-1.5 rounded-lg flex-row items-center gap-1">
                <Text className="text-sm text-on-surface">Last 6 Months</Text>
                <MaterialIcons name="keyboard-arrow-down" size={16} color="#191c1e" />
              </View>
            </View>
            
            {/* Pseudo Chart */}
            <View className="h-[200px] flex-row items-end pb-8 pt-4 relative">
              <View className="absolute left-0 top-0 bottom-8 justify-between z-10 py-2">
                <Text className="text-xs text-on-surface-variant">150M</Text>
                <Text className="text-xs text-on-surface-variant">100M</Text>
                <Text className="text-xs text-on-surface-variant">50M</Text>
                <Text className="text-xs text-on-surface-variant">0</Text>
              </View>
              
              <View className="flex-1 ml-10 flex-row justify-between items-end border-b border-surface-container-highest relative h-full">
                {/* Horizontal Grid lines */}
                <View className="absolute left-0 right-0 top-0 border-b border-surface-container-highest" />
                <View className="absolute left-0 right-0 top-1/3 border-b border-surface-container-highest" />
                <View className="absolute left-0 right-0 top-2/3 border-b border-surface-container-highest" />
                
                {/* Fake Data Bars (Since SVG curve is complex without libs) */}
                <View className="w-4 bg-primary/30 rounded-t-sm" style={{ height: '20%' }}><View className="w-2 h-2 rounded-full bg-primary absolute -top-1 left-1" /></View>
                <View className="w-4 bg-primary/30 rounded-t-sm" style={{ height: '40%' }}><View className="w-2 h-2 rounded-full bg-primary absolute -top-1 left-1" /></View>
                <View className="w-4 bg-primary/30 rounded-t-sm" style={{ height: '30%' }}><View className="w-2 h-2 rounded-full bg-primary absolute -top-1 left-1" /></View>
                <View className="w-4 bg-primary/30 rounded-t-sm" style={{ height: '60%' }}><View className="w-2 h-2 rounded-full bg-primary absolute -top-1 left-1" /></View>
                <View className="w-4 bg-primary/30 rounded-t-sm" style={{ height: '50%' }}><View className="w-2 h-2 rounded-full bg-primary absolute -top-1 left-1" /></View>
                <View className="w-4 bg-primary/30 rounded-t-sm" style={{ height: '80%' }}><View className="w-2 h-2 rounded-full bg-primary absolute -top-1 left-1" /></View>
              </View>
            </View>

            {/* X-Axis */}
            <View className="flex-row justify-between ml-10 mt-2">
              <Text className="text-xs text-on-surface-variant">May</Text>
              <Text className="text-xs text-on-surface-variant">Jun</Text>
              <Text className="text-xs text-on-surface-variant">Jul</Text>
              <Text className="text-xs text-on-surface-variant">Aug</Text>
              <Text className="text-xs text-on-surface-variant">Sep</Text>
              <Text className="text-xs text-on-surface-variant">Oct</Text>
            </View>
          </View>

          {/* Expense Breakdown */}
          <View className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/20 flex-col justify-between">
            <Text className="font-bold text-[18px] text-on-surface mb-6">Expense Breakdown</Text>
            
            <View className="flex-row justify-center mb-6">
              <View className="w-32 h-32 rounded-full border-[12px] border-primary items-center justify-center relative">
                {/* Visual hack for pie chart segments */}
                <View className="absolute top-0 right-0 w-16 h-16 border-t-[12px] border-r-[12px] border-[#6df5e1] rounded-tr-full -mt-[12px] -mr-[12px]" />
                <View className="absolute bottom-0 right-0 w-16 h-16 border-b-[12px] border-[#c3c0ff] rounded-br-full -mb-[12px] -mr-[12px]" />
                
                <Text className="text-xl font-extrabold text-on-surface">32M</Text>
                <Text className="text-xs text-on-surface-variant">Total</Text>
              </View>
            </View>

            <View className="flex-col gap-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-[#4f46e5]" />
                  <Text className="text-sm text-on-surface-variant">Maintenance</Text>
                </View>
                <Text className="font-semibold text-sm text-on-surface">45%</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-[#6df5e1]" />
                  <Text className="text-sm text-on-surface-variant">Utilities</Text>
                </View>
                <Text className="font-semibold text-sm text-on-surface">30%</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-[#c3c0ff]" />
                  <Text className="text-sm text-on-surface-variant">Staff</Text>
                </View>
                <Text className="font-semibold text-sm text-on-surface">15%</Text>
              </View>

              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <View className="w-3 h-3 rounded-full bg-[#e6e8ea]" />
                  <Text className="text-sm text-on-surface-variant">Other</Text>
                </View>
                <Text className="font-semibold text-sm text-on-surface">10%</Text>
              </View>
            </View>
          </View>

        </View>

        {/* Document Center */}
        <View className="bg-surface-container-low rounded-xl p-6 shadow-sm border border-outline-variant/20 mb-4">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-bold text-[18px] text-on-surface">Document Center</Text>
            <TouchableOpacity>
              <Text className="text-[#4f46e5] font-semibold text-sm">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-col gap-4">
            
            {/* Report 1 */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 active:scale-95">
              <View className="flex-row items-center gap-4 flex-1">
                <View className="w-10 h-10 rounded-lg bg-surface items-center justify-center">
                  <MaterialIcons name="picture-as-pdf" size={24} color="#4f46e5" />
                </View>
                <View className="flex-1 pr-2">
                  <Text className="font-semibold text-[15px] text-on-surface" numberOfLines={1}>Monthly Financial Statement - Oct 2023</Text>
                  <Text className="text-xs text-on-surface-variant mt-0.5">Generated: Nov 1, 2023 • 2.4 MB</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-surface items-center justify-center ml-2">
                <MaterialIcons name="download" size={20} color="#464555" />
              </View>
            </TouchableOpacity>

            {/* Report 2 */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 active:scale-95">
              <View className="flex-row items-center gap-4 flex-1">
                <View className="w-10 h-10 rounded-lg bg-surface items-center justify-center">
                  <MaterialIcons name="picture-as-pdf" size={24} color="#4f46e5" />
                </View>
                <View className="flex-1 pr-2">
                  <Text className="font-semibold text-[15px] text-on-surface" numberOfLines={1}>Q3 Operational Summary</Text>
                  <Text className="text-xs text-on-surface-variant mt-0.5">Generated: Oct 5, 2023 • 5.1 MB</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-surface items-center justify-center ml-2">
                <MaterialIcons name="download" size={20} color="#464555" />
              </View>
            </TouchableOpacity>

            {/* Report 3 */}
            <TouchableOpacity className="flex-row items-center justify-between p-4 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 active:scale-95">
              <View className="flex-row items-center gap-4 flex-1">
                <View className="w-10 h-10 rounded-lg bg-surface items-center justify-center">
                  <MaterialIcons name="table-view" size={24} color="#4f46e5" />
                </View>
                <View className="flex-1 pr-2">
                  <Text className="font-semibold text-[15px] text-on-surface" numberOfLines={1}>Annual Tax Document Draft 2023</Text>
                  <Text className="text-xs text-on-surface-variant mt-0.5">Generated: Sep 28, 2023 • 1.8 MB</Text>
                </View>
              </View>
              <View className="w-10 h-10 rounded-full bg-surface items-center justify-center ml-2">
                <MaterialIcons name="download" size={20} color="#464555" />
              </View>
            </TouchableOpacity>

          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

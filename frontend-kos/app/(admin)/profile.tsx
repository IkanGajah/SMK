import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AdminProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Halaman Profil (Admin)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f9fb',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3525cd',
  },
});

import { Platform } from 'react-native';

// Ganti IP ini dengan IPv4 komputer Anda (contoh: 192.168.1.10)
// Untuk Android Emulator gunakan 10.0.2.2
export const API_BASE_URL = Platform.OS === 'android'
  ? 'http://10.1.15.244:8080/api'
  : 'http://localhost:8080/api';

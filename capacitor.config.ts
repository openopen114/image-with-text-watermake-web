import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'image-with-text-watermake-web',
  webDir: 'dist/image-with-text-watermake-web',
  server: {
    androidScheme: 'https'
  }
};

export default config;

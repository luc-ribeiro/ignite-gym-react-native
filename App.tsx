import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto"

import { AuthContextProvider } from '@contexts/AuthContext';

import { Loading } from "./src/components/Loading";
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_400Regular,
  })

  return (
    <View className="flex-1 bg-gray-700">
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </View>
  );
}

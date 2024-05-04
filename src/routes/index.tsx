import { View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useAuth } from "@hooks/useAuth";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";
import { Loading } from "@components/Loading";
import Toast from "react-native-toast-message";

export function Routes() {
  const { user, isLoadingUserStorageData } = useAuth()

  const theme = DefaultTheme
  theme.colors.background = '#121214'

  if (isLoadingUserStorageData) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        {user.id ? <AppRoutes /> : <AuthRoutes />}

        <Toast />
      </NavigationContainer>
    </View>
  )
}
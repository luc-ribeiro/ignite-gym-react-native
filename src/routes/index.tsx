import { View } from "react-native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
  const theme = DefaultTheme
  theme.colors.background = '#121214'

  return (
    <View className="flex-1 bg-gray-700">
      <NavigationContainer theme={theme}>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}
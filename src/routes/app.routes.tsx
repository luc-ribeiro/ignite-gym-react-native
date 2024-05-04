import { Platform } from 'react-native'
import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs'

import HomeSvg from '@assets/home.svg'
import HistorySvg from '@assets/history.svg'
import ProfileSvg from '@assets/profile.svg'

import { Home } from '@screens/Home'
import { Profile } from '@screens/Profile'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'

type AppRoutes = {
  home: undefined
  exercise: { exerciseId: string }
  history: undefined
  profile: undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() { 
  const iconSize = 24

  return (
    <Navigator screenOptions={{ 
      headerShown: false, 
      tabBarShowLabel: false, 
      tabBarActiveTintColor: '#00B37E', 
      tabBarInactiveTintColor: '#C4C4CC',
      tabBarStyle: {
        backgroundColor: '#202024',
        borderTopWidth: 0,
        height: Platform.OS === 'android' ? 'auto' : 96,
        paddingBottom: 40,
        paddingTop: 24
      }
      }}>
      <Screen name="home" component={Home} options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg fill={color} width={iconSize} height={iconSize} />
          )
        }} />

      <Screen name="history" component={History} options={{
          tabBarIcon: ({ color }) => (
            <HistorySvg fill={color} width={iconSize} height={iconSize} />
          )
        }} />

      <Screen name="profile" component={Profile} options={{
          tabBarIcon: ({ color }) => (
            <ProfileSvg fill={color} width={iconSize} height={iconSize} />
          )
        }} />

      <Screen name="exercise" component={Exercise} options={{ tabBarButton: () => null }}  />
    </Navigator>
  )
}
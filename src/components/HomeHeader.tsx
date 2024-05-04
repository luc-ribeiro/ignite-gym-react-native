import { View, Text, TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useAuth } from "@hooks/useAuth";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png';
import { api } from "@services/api";

export function HomeHeader() {
  const { user, signOut } = useAuth()

  return (
    <View className="flex-row bg-gray-600 pt-16 px-8 pb-5 items-center">
      <UserPhoto
        source={
          user.avatar
            ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
            : defaultUserPhotoImg
        }
        size={64}
        alt="Imagem do usuário"
        className='mr-4'
      />

      <View className="flex-1">
        <Text className="text-gray-100 text-md">
          Olá,
        </Text>

        <Text className="text-gray-100 font-bold text-md">
          {user.name}
        </Text>
      </View>

      <TouchableOpacity onPress={signOut}>
        <Icon
          name="logout"
          color='#E1E1E6'
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
}
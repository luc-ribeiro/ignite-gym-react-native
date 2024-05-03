import { View, Text, TouchableOpacity } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { MaterialIcons as Icon } from '@expo/vector-icons';

export function HomeHeader() {
  

  return (
    <View className="flex-row bg-gray-600 pt-16 px-8 pb-5 items-center">
      <UserPhoto
        source={{ uri: 'https://github.com/luc-ribeiro.png' }}
        size={64}
        alt="Imagem do usuário"
        className='mr-4'
      />

      <View className="flex-1">
        <Text className="text-gray-100 text-md">
          Olá,
        </Text>

        <Text className="text-gray-100 font-bold text-md">
          Lucas
        </Text>
      </View>

      <TouchableOpacity>
        <Icon 
          name="logout"
          color='#E1E1E6'
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
}
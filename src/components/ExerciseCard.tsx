import { TouchableOpacity, TouchableOpacityProps, Image, Text, View } from 'react-native';

import { Entypo as Icon } from '@expo/vector-icons';
import { ExerciseDTO } from '@dtos/ExerciseDTO';

import { api } from '@services/api'

type Props = TouchableOpacityProps & {
  data: ExerciseDTO
};

export function ExerciseCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className='bg-gray-500 items-center p-2 pr-4 rounded-md mb-3 flex-row'>
        <Image 
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt="Imagem do exercício"
          width={64}
          height={64}
          resizeMode="cover"
          className="rounded-md mr-4"
        />

        <View className='flex-1'>
          <Text className='text-lg text-white font-bold'>
            {data.name}
          </Text>

          <Text className='text-sm text-gray-200 mt-1' numberOfLines={2}>
            {data.series} séries x {data.repetitions} repetições
          </Text>
        </View>

        <Icon 
          name="chevron-thin-right"
          color='#7C7C8A'
        />
      </View>
    </TouchableOpacity>
  );
}
import { TouchableOpacity, TouchableOpacityProps, Image, Text, View } from 'react-native';

import { Entypo as Icon } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {

};

export function ExerciseCard({ ...rest }: Props) {
  return (
    <TouchableOpacity {...rest}>
      <View className='bg-gray-500 items-center p-2 pr-4 rounded-md mb-3 flex-row'>
        <Image 
          source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
          alt="Imagem do exercício"
          width={64}
          height={64}
          resizeMode="cover"
          className="rounded-md mr-4"
        />

        <View className='flex-1'>
          <Text className='text-lg text-white font-bold'>
            Remada unilateral
          </Text>

          <Text className='text-sm text-gray-200 mt-1' numberOfLines={2}>
            3 séries x 12 repetições
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
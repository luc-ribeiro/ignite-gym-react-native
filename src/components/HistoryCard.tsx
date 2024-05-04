import { HistoryDTO } from '@dtos/HistoryDTO';
import {  Text, View } from 'react-native';

type Props = {
  data: HistoryDTO;
}

export function HistoryCard({ data }: Props) {
  return (
    <View className='flex-row w-full px-5 py-4 mb-3 bg-gray-600 rounded-md items-center justify-between'>
      <View className='mr-5 flex-1'>
        <Text className='text-white text-md capitalize font-bold' numberOfLines={1}>
          {data.group}
        </Text>

        <Text numberOfLines={1} className='text-gray-100 text-lg'>
          {data.name}
        </Text>
      </View>

      <Text className='text-gray-300 text-md'>
        {data.hour}
      </Text>

    </View>
  );
}
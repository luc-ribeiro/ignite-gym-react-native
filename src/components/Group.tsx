import { Pressable, PressableProps, Text } from 'react-native';

type Props = PressableProps & {
  name: string;
  isActive: boolean
}

export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable className={`w-24 h-10 bg-gray-600 rounded-md items-center justify-center overflow-hidden 
                          mr-3 ${isActive ? 'border border-green-500' : 'border-0'}`} {...rest}>
      <Text
        className={`uppercase text-xs font-bold ${isActive ? 'text-green-500' : 'text-gray-200'}`}
      >
        {name}
      </Text>
    </Pressable>
  );
}
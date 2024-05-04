import { Image, ImageProps, View } from 'react-native';

type Props = ImageProps & {
  size: number;
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <View className='border rounded-full border-gray-600'>
      <Image
        className='rounded-full'
        width={size}
        height={size}
        {...rest}
      />
    </View>
  );
}
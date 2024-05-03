import { Image, ImageProps } from 'react-native';

type Props = ImageProps & {
  size: number;
}

export function UserPhoto({ size, ...rest }: Props) {
  return (
    <Image 
      className='rounded-full'
      width={size} 
      height={size} 
      {...rest} 
    />
  );
}
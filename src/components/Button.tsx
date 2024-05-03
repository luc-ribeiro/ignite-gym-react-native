import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'solid' | 'outline';
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
  return (
    <TouchableOpacity
    className={`
      w-full h-14 items-center justify-center 
      rounded-md
      ${variant === 'outline' ? 'border border-green-500 bg-transparent active:bg-gray-500' : 'bg-green-700 active:bg-green-500'}
    `}
    {...rest}
  >
      <Text className={`font-bold text-sm ${variant === 'outline' ? 'text-green-500' : 'text-white'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  )

}
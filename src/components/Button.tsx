import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { Loading } from "./Loading";

type Props = TouchableOpacityProps & {
  title: string;
  variant?: 'solid' | 'outline';
  isLoading?: boolean
}

export function Button({ title, variant = 'solid', isLoading = false, ...rest }: Props) {
  return (
    <TouchableOpacity
      className={`
      w-full h-14 items-center justify-center 
      rounded-md
      ${isLoading && 'opacity-60'}
      ${variant === 'outline' ? 'border border-green-500 bg-transparent active:bg-gray-500' : 'bg-green-700 active:bg-green-500'}
    `}
      {...rest}
    >
      {
        isLoading ? (
          <Loading />
        ) : (
          <Text className={`font-bold text-sm ${variant === 'outline' ? 'text-green-500' : 'text-white'}`}>
            {title}
          </Text>
        )
      }
    </TouchableOpacity>
  )

}
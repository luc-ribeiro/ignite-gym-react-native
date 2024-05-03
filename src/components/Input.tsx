import { TextInputProps, TextInput, View, Text } from "react-native";

type Props = TextInputProps & {
  isDisabled?: boolean
  errorMessage?: string | null
}

export function Input({ isDisabled, errorMessage = null, ...rest }: Props) {
  const isInvalid = !!errorMessage

  return (
    <View className="w-full mb-4">
      <TextInput
        className={`text-white h-14 px-4 mb-2 rounded-md bg-gray-700 border-0 text-md 
       focus:border focus:border-green-500 ${isInvalid && 'border-red-500 border'} `}
        placeholderTextColor={isDisabled ? "#7C7C8A" : "#fff"}
        editable={!isDisabled}
        {...rest}
      />

      {
        isInvalid && <Text className="text-red-500 text-xs">{errorMessage}</Text>
      }
    </View>
  )

}
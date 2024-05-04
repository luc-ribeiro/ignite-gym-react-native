import { ScrollView, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useAuth } from "@hooks/useAuth";

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import Toast from "react-native-toast-message";

type FormData = {
  email: string;
  password: string;
}

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true)
      await signIn(email, password)
      
    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Não foi possível entrar. Tente novamente mais tarde.'

      setIsLoading(false)

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 px-10 pb-16">
        <Image
          source={BackgroundImg}
          defaultSource={BackgroundImg}
          resizeMode="contain"
          className="absolute"
          alt="Pessoas treinando"
        />

        <View className="items-center justify-center my-24">
          <LogoSvg />

          <Text className="text-gray-100 text-sm">
            Treine sua mente e o seu corpo.
          </Text>
        </View>

        <View className="items-center justify-center">
          <Text className="text-gray-100 text-xl mb-6 font-bold">
            Acesse sua conta
          </Text>

          <Controller
            control={control}
            name="email"
            rules={{ required: 'Informe o e-mail.' }}
            render={({ field: { onChange } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                autoCapitalize="none"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Informe a senha.' }}
            render={({ field: { onChange } }) => (
              <Input
                secureTextEntry
                placeholder="Senha"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} isLoading={isLoading} />
        </View>

        <View className="items-center justify-center mt-24">
          <Text className="text-gray-100 text-sm mb-3">
            Ainda não tem acesso?
          </Text>
        </View>

        <Button title="Criar conta" variant="outline" onPress={handleNewAccount} />

      </View>
    </ScrollView>
  )
}
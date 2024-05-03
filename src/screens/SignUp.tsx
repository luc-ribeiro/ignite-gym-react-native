import { ScrollView, Image, Text, View, Alert, ToastAndroid, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod'

import { api } from '@services/api'

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { showToastOrAlert } from "@utils/showToastOrAlert";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

const FIELD_REQUIRED_STR = 'Campo obrigatório.';
const signUpSchema = z.object({
  name: z.string({ required_error: FIELD_REQUIRED_STR }).min(3, 'O nome precisa ter pelo menos 3 letras.'),
  email: z.string({ required_error: FIELD_REQUIRED_STR }).email('Digite um e-mail válido.'),
  password: z.string({ required_error: FIELD_REQUIRED_STR }).min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
  password_confirm: z.string({ required_error: FIELD_REQUIRED_STR }).min(6, 'A senha precisa ter pelo menos 6 caracteres.')
}).refine(data => data.password === data.password_confirm, {
  message: 'As senhas precisam ser iguais.',
  path: ['password_confirm']
})

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const navigation = useNavigation()

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSignUp({ name, email, password }: SignUpSchema) {
    try {
      setIsLoading(true)

      await api.post('/users', { name, email, password})
      await signIn(email, password)

    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Erro no servidor. Tente novamente mais tarde.'

      if (isAppError) {
        return showToastOrAlert(message)
      }
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
            Crie sua conta
          </Text>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="E-mail"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Confirmar a senha"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType="send"
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />


          <Button title="Criar e acessar" onPress={handleSubmit(handleSignUp)} isLoading={isLoading} />

        </View>

        <Button
          title="Voltar para o login"
          variant="outline"
          className="mt-12"
          onPress={handleGoBack}
        />

      </View>
    </ScrollView>
  )
}
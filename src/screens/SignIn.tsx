import { ScrollView, Image, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import LogoSvg from '@assets/logo.svg';
import BackgroundImg from '@assets/background.png';

import { Input } from "@components/Input";
import { Button } from "@components/Button";

const FIELD_REQUIRED_STR = 'Campo obrigatório.';
const signUpSchema = z.object({
  email: z.string({ required_error: FIELD_REQUIRED_STR }).email('Digite um e-mail válido.'),
  password: z.string({ required_error: FIELD_REQUIRED_STR }).min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
})

type SignUpSchema = z.infer<typeof signUpSchema>;

export function SignIn() {
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  })

  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  function handleNewAccount() {
    navigation.navigate('signUp')
  }

  function handleSignIn(data: SignUpSchema) {
    console.log(data)
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

          <Button title="Acessar" onPress={handleSubmit(handleSignIn)} />

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
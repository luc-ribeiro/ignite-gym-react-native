import { Input } from "@components/Input";
import { Loading } from "@components/Loading";
import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View, ToastAndroid, Platform } from "react-native";
import { Button } from "@components/Button";
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

const PHOTO_SIZE = 148;

const FIELD_REQUIRED_STR = 'Campo obrigatório.';
const formSchema = z.object({
  name: z.string({ required_error: FIELD_REQUIRED_STR }).min(3, 'O nome precisa ter pelo menos 3 letras.'),
  old_password: z.string({ required_error: FIELD_REQUIRED_STR }).min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
  password: z.string({ required_error: FIELD_REQUIRED_STR }).min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
  password_confirm: z.string({ required_error: FIELD_REQUIRED_STR }).min(6, 'A senha precisa ter pelo menos 6 caracteres.')
}).refine(data => data.password === data.password_confirm, {
  message: 'As senhas precisam ser iguais.',
  path: ['password_confirm']
})

type FormSchema = z.infer<typeof formSchema>;


export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/luc-ribeiro.png');

  const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  async function handleUserPhotoSelect() {
    setPhotoIsLoading(true)

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
        selectionLimit: 1,
      })

      if (photoSelected.canceled) {
        return
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)

        if (photoInfo.exists && (photoInfo.size / 1024 / 1024) > 3) { // Converting to MB
          if (Platform.OS === 'android') {
            return ToastAndroid.show("Essa imagem é muito grande. Escolha uma de até 3 MB.", ToastAndroid.SHORT)
          } else {
            return Alert.alert("Essa imagem é muito grande. Escolha uma de até 3 MB.")
          }
        }

        setUserPhoto(photoSelected.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  function handleForm(data: FormSchema) {
    console.log(data)
  }


  return (
    <View className="flex-1">
      <ScreenHeader title="Perfil" />

      <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
        <View className=" mt-6 px-10 justify-center items-center">
          {photoIsLoading ? (
            <Loading />
          ) : (
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Imagem do usuário"
              size={PHOTO_SIZE}
            />
          )}

          <TouchableOpacity onPress={handleUserPhotoSelect}>
            <Text className="text-green-500 font-bold text-md mt-2 mb-8">
              Alterar Foto
            </Text>
          </TouchableOpacity>

          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nome"
                className="bg-gray-600"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Input
            className="bg-gray-800"
            placeholder="E-mail"
            isDisabled
          />

          <Text className="text-gray-200 font-bold text-md mb-2 self-start mt-12">Alterar senha</Text>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Senha antiga"
                className="bg-gray-600"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Nova senha"
                className="bg-gray-600"
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
                className="bg-gray-600"
                secureTextEntry
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Atualizar" className="mt-4" onPress={handleSubmit(handleForm)} />
        </View>
      </ScrollView>
    </View>
  );
}
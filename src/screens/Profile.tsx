import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { z } from "zod";

import defaultUserPhotoImg from '@assets/userPhotoDefault.png'

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import Toast from "react-native-toast-message";

const PHOTO_SIZE = 148;

const formSchema = z.object({
  name: z.string({ required_error: 'Campo obrigatório.' }).min(3, 'O nome precisa ter pelo menos 3 letras.'),

  email: z.string().email(),

  old_password: z.string().optional(),

  password: z
    .union([z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'), z.string().length(0)])
    .optional()
    .transform(value => !!value ? value : null),

  password_confirm: z
    .string()
    .optional()
    .transform(value => !!value ? value : null)
})
  .refine(data => data.password === data.password_confirm, {
    message: 'As senhas precisam ser iguais.',
    path: ['password_confirm']
  })

type FormSchema = z.infer<typeof formSchema>;

export function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);

  const { user, updateUserProfile } = useAuth();

  const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email
    }
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
          Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: "Essa imagem é muito grande. Escolha uma de até 3 MB."
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split('.').pop();

        const userNameFormated = user.name.trim().split(' ').join('-');

        const photoFile = {
          name: `${userNameFormated}.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`
        } as any

        const userPhotoUploadForm = new FormData();

        userPhotoUploadForm.append('avatar', photoFile);

        const avatarUpdatedResponse = await api.patch('/users/avatar', userPhotoUploadForm, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const userUpdated = user;

        userUpdated.avatar = avatarUpdatedResponse.data.avatar;

        await updateUserProfile(userUpdated);

        Toast.show({
          type: 'success',
          text1: 'Avatar atualizado com sucesso.'
        });
      }
    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
    }
  }

  async function handleProfileUpdate(data: FormSchema) {
    try {
      setIsUpdating(true);

      const userUpdated = user;
      userUpdated.name = data.name;

      await api.put('/users', data);

      await updateUserProfile(userUpdated);

      Toast.show({
        type: 'success',
        text1: 'Perfil atualizado com sucesso.',
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Não foi possível atualizar os dados. Tente novamente mais tarde.';

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    } finally {
      setIsUpdating(false);
    }
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
              source={
                user.avatar
                  ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` }
                  : defaultUserPhotoImg
              }
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

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <Input
                className="bg-gray-800"
                placeholder="E-mail"
                isDisabled
                onChangeText={onChange}
                value={value}
              />
            )}
          />

          <Text className="text-gray-200 font-bold text-md mb-2 self-start mt-12">Alterar senha</Text>

          <Controller
            control={control}
            name="old_password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Senha antiga"
                className="bg-gray-600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.old_password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Nova senha"
                className="bg-gray-600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password_confirm"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Confirmar a senha"
                className="bg-gray-600"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button title="Atualizar" className="mt-4" isLoading={isUpdating} onPress={handleSubmit(handleProfileUpdate)} />
        </View>
      </ScrollView>
    </View>
  );
}
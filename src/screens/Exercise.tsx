import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import Toast from "react-native-toast-message";

type RouteParamsProps = {
  exerciseId: string
}

export function Exercise() {
  const [sendingRegister, setSendingRegister] = useState(false);
  const [exercise, setExercise] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const route = useRoute()

  const { exerciseId } = route.params as RouteParamsProps

  function handleGoBack() {
    navigation.goBack();
  }

  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/${exerciseId}`)

      setExercise(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Não foi possível carregar o exercício.'

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    } finally {
      setIsLoading(false)
    }
  }

  async function handleExerciseHistoryRegister() {
    try {
      setSendingRegister(true);

      await api.post('/history', { exercise_id: exerciseId });

      Toast.show({
        type: 'success',
        text1: 'Exercício registrado com sucesso!',
        position: "bottom"
      });

      navigation.navigate('history');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Não foi possível registrar exercício.';

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    } finally {
      setSendingRegister(false);
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return (

    <View className="flex-1">
      <View className="px-8 bg-gray-600 pt-12">
        <TouchableOpacity onPress={handleGoBack}>
          <Icon
            name="arrow-left"
            color='#00B37E'
            size={24}
          />
        </TouchableOpacity>

        <View className="flex-row justify-between mt-4 mb-8 items-center">
          <Text className="text-gray-100 text-lg font-bold shrink">
            {exercise.name}
          </Text>

          <View className="flex-row items-center">
            <BodySvg />

            <Text className="text-gray-200 ml-2 capitalize">
              {exercise.group}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        {
          isLoading ? <Loading /> : (
            <View className="p-8">
              <View className="rounded-lg mb-3 overflow-hidden">
                <Image
                  className="rounded-lg w-full"
                  height={320}
                  source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }}
                  alt="Nome do exercício"
                  resizeMode="cover"
                />
              </View>

              <View className="bg-gray-600 rounded-md pb-4 px-4">
                <View className="flex-row items-center justify-around mb-6 mt-5">
                  <View className="flex-row">
                    <SeriesSvg />

                    <Text className="text-green-200 ml-2">
                      {exercise.series} séries
                    </Text>
                  </View>

                  <View className="flex-row">
                    <RepetitionsSvg />

                    <Text className="text-green-200 ml-2">
                      {exercise.repetitions} repetições
                    </Text>
                  </View>
                </View>

                <Button
                  title="Marcar como realizado"
                  isLoading={sendingRegister}
                  onPress={handleExerciseHistoryRegister}
                />
              </View>
            </View>
          )
        }
      </ScrollView>
    </View>
  );
}
import { useCallback, useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { ExerciseCard } from "@components/ExerciseCard";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";
import Toast from "react-native-toast-message";

export function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<ExerciseDTO[]>([]);
  const [groupSelected, setGroupSelected] = useState('antebraço');

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleOpenExerciseDetails(exerciseId: string) {
    navigation.navigate('exercise', { exerciseId });
  }

  async function fetchGroups() {
    try {


      const response = await api.get('/groups')

      setGroups(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Não foi possível carregar os grupos musculares'

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    }
  }

  async function fetchExercisesByGroup() {
    try {
      setIsLoading(true)

      const response = await api.get(`/exercises/bygroup/${groupSelected}`)
      setExercises(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const message = isAppError ? error.message : 'Não foi possível carregar os exercícios'

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  useFocusEffect(useCallback(() => {
    fetchExercisesByGroup()
  }, [groupSelected]))

  return (
    <View className="flex-1">
      <HomeHeader />
      <FlatList
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toLocaleUpperCase() === item.toLocaleUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        className="my-10 max-h-10 min-h-10"
      />

      {
        isLoading ? <Loading /> : (
          <View className="flex-1 px-8">
            <View className="flex-row justify-between mb-5">
              <Text className="font-bold text-md text-gray-200">
                Exercícios
              </Text>

              <Text className="text-md text-gray-200">
                {exercises.length}
              </Text>
            </View>

            <FlatList
              data={exercises}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <ExerciseCard onPress={() => handleOpenExerciseDetails(item.id)} data={item} />
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 20
              }}
            />
          </View>
        )
      }


    </View>
  );
}
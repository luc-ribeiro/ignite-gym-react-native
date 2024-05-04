import { useCallback, useState } from "react";
import { SectionList, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Loading } from "@components/Loading";
import Toast from "react-native-toast-message";

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get('/history');

      setExercises(response.data);

    } catch (error) {
      const isAppError = error instanceof AppError;
      const message = isAppError ? error.message : 'Não foi possível carregar o histórico.';

      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: message
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory()
    }, [])
  )

  return (
    <View className="flex-1">
      <ScreenHeader title="Histórico de Exercícios" />

      {
        isLoading ? <Loading /> : (
          <SectionList
            sections={exercises}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <HistoryCard data={item} />
            )}
            renderSectionHeader={({ section }) => (
              <Text className="text-gray-200 text-md mt-10 mb-3">
                {section.title}
              </Text>
            )}
            className="px-8"
            contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
            ListEmptyComponent={() => (
              <Text className="text-gray-100 text-center">
                Não há exercícios registrados ainda. {'\n'}
                Vamos fazer exercícios hoje?
              </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }

    </View>
  );
}
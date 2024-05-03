import React from "react";
import { Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg';
import SeriesSvg from '@assets/series.svg';
import RepetitionsSvg from '@assets/repetitions.svg';
import { Button } from '@components/Button';

export function Exercise() {

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleGoBack() {
    navigation.goBack();
  }

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
            Puxada frontal
          </Text>

          <View className="flex-row items-center">
            <BodySvg />

            <Text className="text-gray-200 ml-2 capitalize">
              Costas
            </Text>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="p-8">
          <Image
            className="mb-3 rounded-lg w-full"
            height={320}
            source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
            alt="Nome do exercício"
            resizeMode="cover"
          />

          <View className="bg-gray-600 rounded-md pb-4 px-4">
            <View className="flex-row items-center justify-around mb-6 mt-5">
              <View className="flex-row">
                <SeriesSvg />

                <Text className="text-green-200 ml-2">
                  3 séries
                </Text>
              </View>

              <View className="flex-row">
                <RepetitionsSvg />

                <Text className="text-green-200 ml-2">
                  12 repetições
                </Text>
              </View>
            </View>

            <Button
              title="Marcar como realizado"
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
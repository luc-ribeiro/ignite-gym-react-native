import { Platform, ToastAndroid, Alert } from "react-native"

export function showToastOrAlert(message: string) {
  if (Platform.OS === "android") {
    return ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    return Alert.alert(message);
  }
}
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Footer() {
  const { bottom } = useSafeAreaInsets();
  const currentYear = new Date().getFullYear();

  return (
    <View
      className="flex shrink-0 bg-gray-100 native:hidden"
      style={{ paddingBottom: bottom }}
    >
      <View className="py-6 flex-1 items-center px-4 md:px-6">
        <Text className="text-center text-gray-700">
          © {currentYear} MEGA. Todos os direitos reservados.
        </Text>
      </View>
    </View>
  );
}

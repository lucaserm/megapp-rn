import { Text } from "@/components/ui/text";
import { View } from "react-native";

export function ErrorMessages({ errors }: { errors?: string[] }) {
  if (!errors || errors.length === 0) return null;

  return (
    <View className="w-full gap-2">
      {errors.map((err, index) => (
        <Text
          key={`${err}-${index}`}
          className="text-red-500 border-2 border-red-500 p-2 rounded-md"
        >
          {err}
        </Text>
      ))}
    </View>
  );
}

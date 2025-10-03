import { ActivityIndicator, Text, View } from "react-native";

interface UploadProgressProps {
  isLoading: boolean;
  successCount: number;
  totalFiles: number;
}

export function UploadProgress({
  isLoading,
  successCount,
  totalFiles,
}: UploadProgressProps) {
  if (!isLoading) return null;

  const percentage = totalFiles > 0 ? (successCount / totalFiles) * 100 : 0;

  return (
    <View className="bg-gray-50  rounded-xl p-4 my-4 border border-gray-200">
      <View className="flex-row items-center gap-3">
        <ActivityIndicator size="small" color="#007AFF" />
        <View className="flex-1">
          <Text className="text-gray-900  font-semibold">
            Enviando arquivos...
          </Text>
          <Text className="text-gray-600  text-sm mt-1">
            {successCount} de {totalFiles} concluídos ({Math.round(percentage)}
            %)
          </Text>
        </View>
      </View>

      <View className="mt-3 h-2 bg-gray-200  rounded-full overflow-hidden">
        <View
          className="h-full rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: "#007AFF" }}
        />
      </View>
    </View>
  );
}

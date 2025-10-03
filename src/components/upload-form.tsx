"use client";

import { ErrorMessages } from "@/components/error-messages";
import { type Media, MediaPicker } from "@/components/media-picker";
import { Dropdown } from "@/components/ui/dropdown";
import { Text } from "@/components/ui/text";
import { UploadProgress } from "@/components/upload-progress";
import { clients } from "@/constants/clients";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";

export function UploadForm() {
  const [state, actions] = useFileUpload();

  const handleClientChange = useCallback(
    (value: string) => {
      actions.setClientId(value);
    },
    [actions]
  );

  const handleFilesChange = useCallback(
    (medias: Media[]) => {
      actions.setFiles(medias);
    },
    [actions]
  );

  const handleMediaPickerError = useCallback(
    (error: Error) => {
      actions.setFiles([]);
      console.error("Media picker error:", error);
    },
    [actions]
  );

  const canSubmit =
    !state.isLoading && state.files.length > 0 && state.clientId;

  return (
    <View className="gap-6">
      <View>
        <Dropdown
          options={clients}
          selectedValue={state.clientId}
          onValueChange={handleClientChange}
          placeholder="Escolha um cliente"
        />
        <ErrorMessages errors={state.errors.clientId} />
      </View>

      <UploadProgress
        isLoading={state.isLoading}
        successCount={state.successCount}
        totalFiles={state.totalFiles}
      />

      <View>
        <MediaPicker
          options={{
            allowsMultipleSelection: true,
            mediaTypes: ["images"],
          }}
          value={state.files}
          onValueChange={handleFilesChange}
          onError={handleMediaPickerError}
        />
        <ErrorMessages errors={state.errors.options} />
        <ErrorMessages errors={state.errors.files} />
      </View>

      <ErrorMessages errors={state.errors.fetch} />

      <View className="flex-row gap-4 mt-4">
        <TouchableOpacity
          className={`flex-1 h-12 items-center justify-center rounded-xl ${
            state.isLoading ? "bg-gray-300" : "bg-gray-200"
          }`}
          onPress={actions.reset}
          disabled={state.isLoading}
          activeOpacity={0.7}
        >
          <Text
            className={`font-semibold ${
              state.isLoading ? "text-gray-400" : "text-gray-900 "
            }`}
          >
            Resetar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 h-12 items-center justify-center rounded-xl ${
            !canSubmit ? "bg-gray-300 " : "bg-[#007AFF]"
          }`}
          onPress={actions.submit}
          disabled={!canSubmit}
          activeOpacity={0.7}
        >
          <Text
            className={`font-semibold ${
              !canSubmit ? "text-gray-400" : "text-white"
            }`}
          >
            {state.isLoading ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

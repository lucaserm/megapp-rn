import { Image } from "expo-image";
import {
  type ImagePickerOptions,
  launchImageLibraryAsync,
} from "expo-image-picker";
import type { PlayerError } from "expo-video";
import { UploadIcon } from "lucide-react-native";
import type React from "react";
import { useImperativeHandle, useState } from "react";
import {
  TouchableOpacity,
  type TouchableOpacityProps,
  View,
} from "react-native";

import { SUPPORTED_MIMETYPES } from "@/constants/supported-mimetypes";
import { cn } from "@/lib/utils";

import { Dropdown } from "@/components/ui/dropdown";
import { imageOptions } from "@/constants/image-options";
import { Text } from "./ui/text";

export type MediaType = "image" | "video";

export type Media = {
  id?: string;
  filename: string;
  mimetype: string;
  uri: string;
  type: MediaType;
  option?: string;
  sizeInBytes: number;
};

export type MediaPickerRef = {
  launchPicker: (options?: ImagePickerOptions) => void;
};

interface MediaPickerProps {
  value: Media[];
  options?: ImagePickerOptions;
  children?: ((value: Media[] | null) => React.ReactNode) | React.ReactNode;
  onError?: (error: Error | PlayerError) => void;
  onValueChange?: (data: Media[]) => void;
  ref?: React.Ref<MediaPickerRef>;
}

export function MediaPicker({
  value,
  options: baseOptions,
  children,
  onError,
  onValueChange,
  ref,
}: MediaPickerProps) {
  async function handlePickMedia(options?: ImagePickerOptions) {
    const result = await launchImageLibraryAsync({
      ...baseOptions,
      ...options,
      selectionLimit: 0,
    });

    if (result.canceled || !result.assets) {
      onError?.(new Error("Cancelado pelo usuário."));
      return;
    }

    const medias: (Media & { sizeInBytes: number })[] = [];

    for (const asset of result.assets) {
      if (!asset.mimeType) {
        onError?.(new Error("Falha ao obter o formato do arquivo."));
        return;
      }
      if (
        !SUPPORTED_MIMETYPES.includes(asset.mimeType ?? "") ||
        !["image", "video"].includes(asset.type!)
      ) {
        onError?.(new Error("Formato de arquivo não suportado."));
        return;
      }

      const sizeInBytes = asset.fileSize;
      if (typeof sizeInBytes !== "number") {
        onError?.(new Error("Não foi possível obter o tamanho do arquivo."));
        return;
      }

      const filename =
        asset.fileName ?? `media.${asset.mimeType?.split("/")[1]}`;

      medias.push({
        filename,
        mimetype: asset.mimeType,
        uri: asset.uri,
        type: asset.type as MediaType,
        sizeInBytes,
      });
    }

    if (medias.length > 0) {
      onValueChange?.(medias);
    }
  }

  useImperativeHandle(ref, () => ({ launchPicker: handlePickMedia }));

  if (typeof children === "function") return children(value);
  if (children) return children;
  if (value.length > 0) {
    return (
      <View className="flex-row flex-wrap gap-2">
        {value.map((media, i) => (
          <View key={i}>
            <MediaPickerPreview media={media} onError={onError} />
            <Dropdown
              options={imageOptions}
              onValueChange={(option) => {
                const updated = value.map((m) =>
                  m.uri === media.uri ? { ...m, option } : m
                );
                onValueChange?.(updated);
              }}
              selectedValue={media.option}
              placeholder="Escolha uma opção"
            />
          </View>
        ))}
      </View>
    );
  }

  return <MediaPickerButton onPress={() => handlePickMedia()} />;
}

interface MediaPickerButtonProps extends TouchableOpacityProps {
  label?: string;
}

export function MediaPickerButton({
  label = "Selecionar arquivo",
  className,
  ...props
}: MediaPickerButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={cn(
        "items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-border p-6",
        className
      )}
      {...props}
    >
      <UploadIcon className="size-8 text-foreground" />
      <Text className="text-center font-b text-lg">{label}</Text>
    </TouchableOpacity>
  );
}

interface MediaPickerPreviewProps {
  media: Media;
  aspectRatio?: number;
  onError?: (error: Error | PlayerError) => void;
  onPress?: () => void;
}

export function MediaPickerPreview({
  media,
  aspectRatio: fixedAspectRatio,
  onError,
  onPress,
}: MediaPickerPreviewProps) {
  const [aspectRatio, setAspectRatio] = useState(fixedAspectRatio);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="w-full items-center"
      onPress={onPress}
    >
      {media.type === "image" && (
        <View
          className="overflow-hidden rounded-lg border-2 border-dashed border-border"
          style={{
            aspectRatio: fixedAspectRatio ?? aspectRatio,
            width: "100%",
            maxWidth: "100%",
            maxHeight: 300,
          }}
        >
          <Image
            contentFit="contain"
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: media.uri }}
            onLoad={({ source }) => {
              if (fixedAspectRatio) {
                return;
              }

              setAspectRatio(source.width / source.height);
            }}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

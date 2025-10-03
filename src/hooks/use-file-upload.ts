"use client";

import type { Media } from "@/components/media-picker";
import { apiService } from "@/services/api-service";
import type { FormErrors } from "@/types/form-errors";
import { extractPhotoIds } from "@/utils/extract-photo-ids";
import { validateFormFields } from "@/utils/validate-form-fields";
import { AxiosError } from "axios";
import { useCallback, useState } from "react";

export interface UploadState {
  isLoading: boolean;
  files: Media[];
  errors: FormErrors;
  clientId?: string;
  successCount: number;
  totalFiles: number;
}

export interface UploadActions {
  setClientId: (id: string) => void;
  setFiles: (files: Media[]) => void;
  clearError: (field: keyof FormErrors) => void;
  reset: () => void;
  submit: () => Promise<void>;
}

const initialState: UploadState = {
  isLoading: false,
  files: [],
  errors: {},
  clientId: undefined,
  successCount: 0,
  totalFiles: 0,
};

export function useFileUpload(): [UploadState, UploadActions] {
  const [state, setState] = useState<UploadState>(initialState);

  const setClientId = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      clientId: id,
      errors: { ...prev.errors, clientId: undefined },
    }));
  }, []);

  const setFiles = useCallback((files: Media[]) => {
    setState((prev) => ({
      ...prev,
      files,
      totalFiles: files.length,
      errors: { ...prev.errors, files: undefined },
    }));
  }, []);

  const clearError = useCallback((field: keyof FormErrors) => {
    setState((prev) => {
      if (!prev.errors[field]) return prev;
      const newErrors = { ...prev.errors };
      delete newErrors[field];
      return { ...prev, errors: newErrors };
    });
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  const uploadSingleFile = async (
    file: Media,
    clientId: string
  ): Promise<boolean> => {
    try {
      if (!file.option) {
        console.error("File missing location option");
        return false;
      }

      // Upload the file
      const uploadResponse = await apiService.uploadPhoto(file, clientId);

      if (uploadResponse.status !== 200) {
        console.error("Upload failed:", uploadResponse.status);
        return false;
      }

      // Get photo list and extract IDs
      const listResponse = await apiService.getPhotosList();
      const photoIds = extractPhotoIds(listResponse.data);

      if (photoIds.length === 0) {
        console.error("No photo ID found after upload");
        return false;
      }

      // Update photo location
      await apiService.updatePhotoLocation(photoIds[0], file.option);

      return true;
    } catch (error) {
      console.error("Error uploading file:", error);
      return false;
    }
  };

  const submit = useCallback(async () => {
    const { clientId, files } = state;

    // Validate form fields
    const validationErrors = validateFormFields(clientId, files);

    if (Object.keys(validationErrors).length > 0) {
      setState((prev) => ({ ...prev, errors: validationErrors }));
      return;
    }

    if (!clientId) return;

    setState((prev) => ({
      ...prev,
      isLoading: true,
      errors: {},
      successCount: 0,
    }));

    try {
      let successfulUploads = 0;
      const remainingFiles: Media[] = [];

      // Upload files sequentially
      for (const file of files) {
        const success = await uploadSingleFile(file, clientId);

        if (success) {
          successfulUploads++;
          setState((prev) => ({ ...prev, successCount: successfulUploads }));
        } else {
          remainingFiles.push(file);
        }
      }

      // Update state with results
      setState((prev) => ({
        ...prev,
        files: remainingFiles,
        isLoading: false,
        errors:
          remainingFiles.length > 0
            ? {
                fetch: [
                  `✓ ${successfulUploads} arquivo(s) enviado(s) com sucesso. ✗ ${remainingFiles.length} falhou(aram).`,
                ],
              }
            : {},
      }));

      // Show success message if all files uploaded
      if (remainingFiles.length === 0 && successfulUploads > 0) {
        setState((prev) => ({
          ...prev,
          errors: {
            fetch: [
              `✓ Todos os ${successfulUploads} arquivos foram enviados com sucesso!`,
            ],
          },
        }));
      }
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError
          ? `Erro de conexão: ${error.message}`
          : "Falha no envio dos arquivos. Tente novamente.";

      setState((prev) => ({
        ...prev,
        isLoading: false,
        errors: { fetch: [errorMessage] },
      }));

      console.error("Upload error:", error);
    }
  }, [state]);

  const actions: UploadActions = {
    setClientId,
    setFiles,
    clearError,
    reset,
    submit,
  };

  return [state, actions];
}

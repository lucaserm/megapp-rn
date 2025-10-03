import { Media } from "@/components/media-picker";
import { FormErrors } from "@/types/form-errors";

export const validateFormFields = (
  clientId: string | undefined,
  files: Media[]
): FormErrors => {
  const errors: FormErrors = {};

  if (!clientId) {
    errors.clientId = ["O cliente é obrigatório."];
  }

  if (!files.length) {
    errors.files = ["Arquivos são obrigatórios."];
  }

  if (files.some((f) => !f.option)) {
    errors.options = ["A opção é obrigatória."];
  }

  return errors;
};

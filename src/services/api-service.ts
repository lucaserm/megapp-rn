import { Media } from "@/components/media-picker";
import {
  API_BASE_URL,
  NETWORK_ID,
  UNIT_ID,
  USER_NAME,
} from "@/constants/general";
import axios from "axios";

export const apiService = {
  uploadPhoto: async (file: Media, clientId: string) => {
    const formData = new FormData();
    formData.append("acao", "cadastrar");
    formData.append("id_rede", NETWORK_ID);
    formData.append("id_unidade", UNIT_ID);
    formData.append(`fotos[0]`, {
      uri: file.uri,
      type: file.mimetype,
      name: file.filename,
    } as any);
    formData.append("id_cliente", clientId);

    return axios.post(
      `${API_BASE_URL}/app/controllers/promotores/fotos/fotosController.php?acao=insert&ambiente=promotores&modulo=fotos&pagina=fotos`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
  },

  getPhotosList: async () => {
    return axios.get(
      `${API_BASE_URL}/promotores/fotos/fotos/8c26633a4734157cd8baddce2a07ce79026db9fc/insert`
    );
  },

  updatePhotoLocation: async (photoId: string, location: string) => {
    const form = new FormData();
    form.append(`fotos[${photoId}][local]`, location);
    form.append("acao", "atualiza_aguardando");
    form.append("user", USER_NAME);

    return axios.post(
      `${API_BASE_URL}/app/controllers/promotores/fotos/fotosController.php?acao=atualiza_aguardando&ambiente=promotores&modulo=fotos&pagina=fotos`,
      form,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
  },
};

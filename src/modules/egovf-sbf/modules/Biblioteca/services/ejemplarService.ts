import { SBFApi } from '@sbf/api/SBFApi';
import { API_URL_EGOVF_SBF_FL } from '@env'
import Swal from 'sweetalert2'

export enum EstadoEjemplar{
  Disponible = "Disponible",
  Prestado = "Prestado",
  Dañado = "Dañado",
  SinEstado = "",
}

export interface Ejemplar {
  codigo: number;
  estado: EstadoEjemplar;
  portada: string;
  direccion: string;
  id_libro: number;
  contenido_pdf: string;
}

export const getEjemplares = async (): Promise<Ejemplar[]> => {
  try {
    const { data } = await SBFApi.get<Ejemplar[]>('/ejemplar/listar');
    // return data;
    return data.map(ejemplar => ({
      ...ejemplar,
      portada: getProductImageAction(ejemplar.portada)
    }));
  } catch (error) {
    console.error(error);
    throw new Error('Error getting ejemplares');
  }
};
export const getEjemplaresByLibroId = async (idLibro: number): Promise<Ejemplar[]> => {
  try {
    const { data } = await SBFApi.get<Ejemplar[]>(`/ejemplar/buscar/libro?idLibro=${idLibro}`);
    return data.map(ejemplar => ({
      ...ejemplar,
      portada: getProductImageAction(ejemplar.portada),
      contenido_pdf: ejemplar.contenido_pdf || '',
    }));
    // return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting ejemplaresLibro');
  }
};

// export const createEjemplar = async (ejemplar: Partial<Ejemplar>): Promise<Ejemplar> => {
//   try {
//     const { data } = await SBFApi.post<Ejemplar>('/ejemplar/add', ejemplar);
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Error creating ejemplar');
//   }
// };
export const createEjemplar = async (ejemplar: Partial<Ejemplar>, imageFile?:File, pdfFile?: File,)=> {
  try {
    let portadaUrl = '';
    if (imageFile) {
      portadaUrl = await uploadFileImage(imageFile);
    }
        // Upload PDF file if provided
    let pdfUrl = "";
    if (pdfFile) {
      pdfUrl = await uploadFile(pdfFile);
    }
    const ejemplarData: Partial<Ejemplar> = {
      ...ejemplar,
      portada: portadaUrl || ejemplar.portada || '',
      contenido_pdf: pdfUrl || ejemplar.contenido_pdf || '',
    };
    const { data } = await SBFApi.post<Ejemplar>('/ejemplar/add', ejemplarData);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating ejemplar');
  }
};

export const updateEjemplar = async (ejemplar: Partial<Ejemplar>, imageFile?:File, pdfFile?: File,): Promise<Ejemplar> => {
  try {
    let portadaUrl = '';
    if (imageFile) {
      portadaUrl = await uploadFileImage(imageFile);
    }
        // Upload PDF file if provided
    let pdfUrl = "";
    if (pdfFile && ejemplar.contenido_pdf === 'nuevo') { // para no volver a subir el pdf
      pdfUrl = await uploadFile(pdfFile);
    }
    const ejemplarData: Partial<Ejemplar> = {
      ...ejemplar,
      portada: portadaUrl || ejemplar.portada || '',
      contenido_pdf: pdfUrl || ejemplar.contenido_pdf || '',
    };
    const { data } = await SBFApi.put<Ejemplar>('/ejemplar/edit', ejemplarData);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error updating ejemplar');
  }
};

export const deleteEjemplar = async (codigo: number): Promise<void> => {
  try {
    await SBFApi.delete('/ejemplar/delete', { data: { codigo } });
  } catch (error) {
    console.error(error);
    throw new Error('Error deleting ejemplar');
  }
};

export const uploadFileImage = async (file: File)=> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await SBFApi.post('/ejemplar/upload-portada', formData);
    return data;
  } catch (error) {
    throw new Error(`Error uploading file ${file.name}`);
  }
};

export const uploadFile = async (file: File)=> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await SBFApi.post('/ejemplar/upload', formData);
    return data;
  } catch (error) {
    throw new Error(`Error uploading file ${file.name}`);
  }
};

export const getProductImageAction = (imageName: string): string => {
  // return imageName.includes('http')
  //   ? imageName
  //   : `${API_URL_EGOVF_SBF_FL}${imageName}`

      const fullUrl = imageName.startsWith('http')
    ? imageName
    : `${API_URL_EGOVF_SBF_FL}${imageName.startsWith('/') ? '' : '/'}${imageName}`

    return fullUrl;
}

export const verPdf = (ejemplarDisponible: Ejemplar) => {
  const pdf = ejemplarDisponible?.contenido_pdf;
  if (pdf) {
    const fullUrl = pdf.startsWith('http')
    ? pdf
    : `${API_URL_EGOVF_SBF_FL}${pdf.startsWith('/') ? '' : '/'}${pdf}`
    window.open(fullUrl, '_blank')
  } else {
    Swal.fire('Sin PDF', 'Este libro no tiene un PDF disponible.', 'info')
  }
}
import { SBFApi } from '@sbf/api/SBFApi';

export interface EstaEn {
  id_esta_en?: number; 
  idLibro: number;
  idPrestamo: number;
}

// Obtener todos los registros de esta_en
export const getEstaEn = async (): Promise<EstaEn[]> => {
  try {
    const { data } = await SBFApi.get<EstaEn[]>('/estaen/all');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener las relaciones esta_en');
  }
};

export const getEstaEnByPrestamo = async (id_prestamo: number): Promise<EstaEn[]> => {
  try {
    const { data } = await SBFApi.get<EstaEn[]>(`/esta_en/buscar/prestamo`, {
      params: { id_prestamo }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar relaciones esta_en por id_prestamo');
  }
};

export const getEstaEnByLibro = async (id_libro: number): Promise<EstaEn[]> => {
  try {
    const { data } = await SBFApi.get<EstaEn[]>(`/esta_en/buscar/libro`, {
      params: { id_libro }
    });
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al buscar relaciones esta_en por id_libro');
  }
};

// Crear un nuevo registro esta_en
export const createEstaEn = async (relacion: EstaEn): Promise<EstaEn> => {
  try {
    const { data } = await SBFApi.post<EstaEn>('/estaen/save', relacion);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear la relación esta_en');
  }
};

// Actualizar un registro esta_en
export const updateEstaEn = async (relacion: EstaEn): Promise<EstaEn> => {
  try {
    const { data } = await SBFApi.put<EstaEn>('/estaen/update', relacion);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar la relación esta_en');
  }
};

// Eliminar un registro esta_en
export const deleteEstaEn = async (id_esta_en: number): Promise<void> => {
  try {
    await SBFApi.delete('/estaen/delete', {
      data: { id_esta_en }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar la relación esta_en');
  }
};

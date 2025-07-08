import { SBFApi } from '@sbf/api/SBFApi';

export interface Ejemplar {
  codigo: number;
  estado: string;
  portada: string;
  direccion: string;
  id_libro: number;
}

export const getEjemplares = async (): Promise<Ejemplar[]> => {
  try {
    const { data } = await SBFApi.get<Ejemplar[]>('/ejemplar/listar');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting ejemplares');
  }
};
export const getEjemplaresByLibroId = async (idLibro: number): Promise<Ejemplar[]> => {
  try {
    const { data } = await SBFApi.get<Ejemplar[]>(`/ejemplar/buscar/libro?idLibro=${idLibro}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting ejemplaresLibro');
  }
};

export const createEjemplar = async (ejemplar: Partial<Ejemplar>): Promise<Ejemplar> => {
  try {
    const { data } = await SBFApi.post<Ejemplar>('/ejemplar/add', ejemplar);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error creating ejemplar');
  }
};

export const updateEjemplar = async (ejemplar: Partial<Ejemplar>): Promise<Ejemplar> => {
  try {
    const { data } = await SBFApi.put<Ejemplar>('/ejemplar/edit', ejemplar);
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

import { SBFApi } from '@sbf/api/SBFApi';

export interface Biblioteca {
  id_biblioteca: number;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  horario_atencion: string;
  id_facultad: number;
}

// Obtener todas las bibliotecas
export const getBibliotecas = async () => {
  try {
    const { data } = await SBFApi.get<Biblioteca[]>(`/biblioteca/listar_bibliotecas`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error getting bibliotecas');
  }
};

// Crear nueva biblioteca
export const createBiblioteca = async (biblioteca: Partial<Biblioteca>) => {
  try {
    const { data } = await SBFApi.post<Biblioteca>(`/biblioteca/addBiblioteca`, biblioteca);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating biblioteca');
  }
};

// Editar biblioteca existente
export const updateBiblioteca = async (biblioteca: Partial<Biblioteca>) => {
  try {
    const { data } = await SBFApi.put<Biblioteca>(`/biblioteca/editBiblioteca`, biblioteca);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error updating biblioteca');
  }
};

// Eliminar biblioteca
export const deleteBiblioteca = async (id_biblioteca: number) => {
  try {
    const { data } = await SBFApi.delete(`/biblioteca/deleteBiblioteca`, {
      data: { id_biblioteca }
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting biblioteca');
  }
};

import { SBFApi } from '@sbf/api/SBFApi';

export interface Biblioteca {
  id_biblioteca: number;
  nombre: string;
  direccion: string;
  latitud: number;
  longitud: number;
  horario_atencion: string;
  id_facultad: number;
  id_usuario: number;
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

export const getBibliotecaById = async (idBiblioteca: number) => {
  try {
    const bibliotecas = await getBibliotecas();

    const bibliotecaoEncontrado = bibliotecas.find(biblioteca => biblioteca.id_biblioteca === idBiblioteca);

    return bibliotecaoEncontrado ?? null;
  } catch (error) {
    console.error('Error al obtener la biblioteca:', error);
    return null;
  }
};

export const getBibliotecaByUser = async (idUsuario: number) => {
  try {
    const { data } = await SBFApi.get<Biblioteca[]>(`/biblioteca/por-usuario`, {
      params: { idUsuario }
    });
    return data;
  } catch (error) {
    console.error('Error al obtener la biblioteca:', error);
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
    // console.log({biblioteca})
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

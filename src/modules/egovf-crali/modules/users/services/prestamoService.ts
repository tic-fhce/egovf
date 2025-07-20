import { SBFApi } from '@sbf/api/SBFApi';

export interface Prestamo {
  id_prestamo: number;
  fecha_pres: string;
  fecha_dev: string;
  id_lector: number;
}

export const getPrestamos = async (): Promise<Prestamo[]> => {
  try {
    const { data } = await SBFApi.get<Prestamo[]>('/prestamo/all');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los préstamos');
  }
};

export const createPrestamo = async (prestamo: Partial<Prestamo>): Promise<Prestamo> => {
  try {
    const { data } = await SBFApi.post<Prestamo>('/prestamo/save', prestamo);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el préstamo');
  }
};

export const updatePrestamo = async (prestamo: Partial<Prestamo>): Promise<Prestamo> => {
  try {
    const { data } = await SBFApi.put<Prestamo>('/prestamo/update', prestamo);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el préstamo');
  }
};

export const deletePrestamo = async (id_prestamo: number): Promise<void> => {
  try {
    await SBFApi.delete('/prestamo/delete', {
      data: { id_prestamo }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el préstamo');
  }
};

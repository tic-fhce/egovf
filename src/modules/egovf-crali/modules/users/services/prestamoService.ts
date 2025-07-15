import { PrestamoApi } from './PrestamoApi';

export interface Prestamo {
  id_prestamo: number;
  fecha_pres: string;
  fecha_dev: string;
  id_lector: number;
}

export const getPrestamos = async (): Promise<Prestamo[]> => {
  try {
    const { data } = await PrestamoApi.get<Prestamo[]>('/prestamo/all');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los préstamos');
  }
};

export const getPrestamoById = async (idPrestamo: number): Promise<Prestamo | null> => {
  try {
    const prestamos = await getPrestamos();
    const prestamo = prestamos.find(p => p.id_prestamo === idPrestamo);
    return prestamo ?? null;
  } catch (error) {
    console.error('Error al obtener el préstamo:', error);
    return null;
  }
};

export const createPrestamo = async (prestamo: Partial<Prestamo>): Promise<Prestamo> => {
  try {
    const { data } = await PrestamoApi.post<Prestamo>('/prestamo/add', prestamo);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el préstamo');
  }
};

export const updatePrestamo = async (prestamo: Partial<Prestamo>): Promise<Prestamo> => {
  try {
    const { data } = await PrestamoApi.put<Prestamo>('/prestamo/update', prestamo);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el préstamo');
  }
};

export const deletePrestamo = async (id_prestamo: number): Promise<void> => {
  try {
    await PrestamoApi.delete('/prestamo/delete', {
      data: { id_prestamo }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el préstamo');
  }
};

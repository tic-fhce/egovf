import { SBFApi } from '@sbf/api/SBFApi';

export interface Lector {
  id_lector: number;
  nombre: string;
  apellido_pat: string;
  apellido_mat: string;
  ci: number;
  ru: number;
  direccion: string;
  celular: number;
  carrera: string;
}

export const getLectors = async (): Promise<Lector[]> => {
  try {
    const { data } = await SBFApi.get<Lector[]>('/lector/listar');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los lectores');
  }
};

export const getLectorById = async (id_lector: number): Promise<Lector> => {
  try {
    const lectors = await getLectors();
    const lector = lectors.find(lector => lector.id_lector === id_lector);

    if (lector) {
      return lector;
    } else {
      throw new Error('Lector no encontrado');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el lector');
  }
};
export const getLectorByCi = async (ci_lector: number): Promise<Lector> => {
  try {
    const lectors = await getLectors();
    const lector = lectors.find(lector => lector.ci === ci_lector);

    if (lector) {
      return lector;
    } else {
      throw new Error('Lector no encontrado');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el lector');
  }
};

export const createLector = async (lector: Partial<Lector>): Promise<Lector> => {
  try {
    const { data } = await SBFApi.post<Lector>('/lector/add', lector);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el lector');
  }
};

export const updateLector = async (lector: Partial<Lector>): Promise<Lector> => {
  try {
    const { data } = await SBFApi.put<Lector>('/lector/edit', lector);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el lector');
  }
};

export const deleteLector = async (id_lector: number): Promise<void> => {
  try {
    await SBFApi.delete('/lector/delete', {
      data: { id_lector }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el lector');
  }
};
import { SBFApi } from '@sbf/api/SBFApi';

export interface User {
  id_usuario: number;
  nombre_usuario: string;
  contrasena: string;
  rol: Rol;
}
export enum Rol {
  superAdmin = "superAdmin",
  admin = "admin",
  lector = "lector",
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const { data } = await SBFApi.get<User[]>('/usuario/listar');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los usuarios');
  }
};

export const getUsersRol = async (rol: string): Promise<User[]> => {
  try {
    const { data } = await SBFApi.get<User[]>(`/usuario/buscar/rol?=${rol}`);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener los usuarios');
  }
};

export const getUserRol = async (id_usuario: number): Promise<Rol> => {
  try {
    const users = await getUsers(); 
    const user = users.find(user => user.id_usuario === id_usuario); 

    if (user) {
      return user.rol;
    } else {
      throw new Error('Usuario no encontrado');
    }
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener el rol del usuario');
  }
};

export const createUser = async (usuario: Partial<User>): Promise<User> => {
  try {
    const { data } = await SBFApi.post<User>('/usuario/add', usuario);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al crear el usuario');
  }
};

export const updateUser = async (usuario: Partial<User>): Promise<User> => {
  try {
    const { data } = await SBFApi.put<User>('/usuario/edit', usuario);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error al actualizar el usuario');
  }
};

export const deleteUser = async (id_usuario: number): Promise<void> => {
  try {
    await SBFApi.delete('/usuario/delete', {
      data: { id_usuario }
    });
  } catch (error) {
    console.error(error);
    throw new Error('Error al eliminar el usuario');
  }
};

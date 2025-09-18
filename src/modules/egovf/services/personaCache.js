import Dexie from 'dexie';

const DB_NAME = 'PersonaDB';
const db = new Dexie(DB_NAME);

// Schema: tabla 'personas' con pk 'id' y un store 'meta' para metadatos (ej. ultimaCarga)
db.version(2).stores({
  personas: 'id,cif,ci,complemento,nombre,paterno,materno,fecha,sexo,cel,correo', 
  meta: 'key'
});

export async function getListaPersonasCached({ maxAgeMinutes = 10, fetcher }) {
  const meta = await db.meta.get('personas');
  const data = await db.personas.toArray();
  const now = Date.now();

  if (data.length > 0) {
    if (meta && (now - meta.timestamp) < maxAgeMinutes * 60 * 1000) {
      return data;
    } else {
      fetcher().then(async response => {
        await db.transaction('rw', db.personas, db.meta, async () => {
          await db.personas.clear();
          await db.personas.bulkPut(response.data);
          await db.meta.put({ key: 'personas', timestamp: now });
        });
      });
      return data;
    }
  }

  // Si no hay cache → API obligatorio

  const response = await fetcher();
  await db.transaction('rw', db.personas, db.meta, async () => {
    await db.personas.clear();
    await db.personas.bulkPut(response.data);
    await db.meta.put({ key: 'personas', timestamp: now });
  });
  return response.data;
}

/** Borrar cache manualmente */
export async function clearCiudadanoCache() {
  await db.transaction('rw', db.personas, db.meta, async () => {
    await db.personas.clear();
    await db.meta.delete('ultimaCarga');
  });
}

/** Obtener un ciudadano por id */
export async function getCiudadanoById(id) {
  return db.personas.get(id);
}

/** Exponer la instancia si la quieres usar directamente en dev/debug */
export { db };
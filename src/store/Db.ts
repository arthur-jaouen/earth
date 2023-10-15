export const createDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open('earth', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;

      db.onerror = null;

      resolve(db);
    };

    request.onupgradeneeded = () => {
      const db = request.result;

      db.onerror = () => reject(Error());

      const store = db.createObjectStore('blobs');

      store.createIndex('blob', 'blob', { unique: false });
      store.createIndex('date', 'date', { unique: false });
    };
  });

export const execute = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });

let db: IDBDatabase | null = null;

export const getDb = async () => {
  if (!db) {
    db = await createDb();
  }

  return db!;
};

export const getBlob = async (id: string): Promise<{ blob: Blob; date: Date } | null> => {
  const db = await getDb();

  const request = db
    .transaction('blobs', 'readonly', { durability: 'relaxed' })
    .objectStore('blobs')
    .get(id);

  return execute(request);
};

export const addBlob = async (id: string, blob: Blob, date: Date): Promise<void> => {
  const db = await getDb();

  const request = db
    .transaction('blobs', 'readwrite', { durability: 'relaxed' })
    .objectStore('blobs')
    .put({ blob, date }, id);

  await execute(request);
};

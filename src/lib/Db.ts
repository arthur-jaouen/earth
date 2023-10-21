export const createDb = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = window.indexedDB.open('earth', 2)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => {
      const db = request.result

      db.onerror = null

      resolve(db)
    }

    request.onupgradeneeded = () => {
      const db = request.result

      db.onerror = () => reject(Error())

      if (db.objectStoreNames.contains('blobs')) {
        db.deleteObjectStore('blobs')
      }

      const pictures = db.createObjectStore('pictures')
      const timelines = db.createObjectStore('timelines')

      pictures.createIndex('url', 'url', { unique: false })
      pictures.createIndex('blob', 'blob', { unique: false })
      pictures.createIndex('date', 'date', { unique: false })

      timelines.createIndex('latest', 'latest', { unique: false })
    }
  })

export const execute = <T>(request: IDBRequest<T>): Promise<T> =>
  new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)
  })

let db: IDBDatabase | null = null

export const getDb = async () => {
  if (!db) {
    db = await createDb()
  }

  return db!
}

export const get = async <T>(table: string, id: string): Promise<T | undefined> => {
  const db = await getDb()
  const request = db
    .transaction(table, 'readonly', { durability: 'relaxed' })
    .objectStore(table)
    .get(id)

  return execute(request)
}

export const put = async <T>(table: string, id: string, entry: T): Promise<void> => {
  const db = await getDb()
  const request = db
    .transaction(table, 'readwrite', { durability: 'relaxed' })
    .objectStore(table)
    .put(entry, id)

  await execute(request)
}

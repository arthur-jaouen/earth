import { useSyncExternalStore } from 'react'

export class Iter<T = unknown> {
  constructor(public readonly next: () => IteratorResult<T, void>) {}

  static readonly empty = new Iter(() => ({ done: true, value: undefined }))

  static from<T = unknown>(iter: Iterator<T>): Iter<T> {
    return new Iter(() => iter.next())
  }

  static infinite<T = unknown>(value: T): Iter<T> {
    return new Iter<T>(() => ({ done: false, value }))
  }
}

export class It<T = unknown> {
  constructor(public readonly iter: () => Iterator<T>) {}

  static from<T = unknown>(it: Iterable<T>): It<T> {
    return new It(() => it[Symbol.iterator]())
  }

  [Symbol.iterator]() {
    return this.iter()
  }

  map<U>(f: (t: T) => U): It<U> {
    return new It(() => {
      const iter = this.iter()

      return new Iter(() => {
        const result = iter.next()

        return result.done ? result : { done: false, value: f(result.value) }
      })
    })
  }

  filter(f: (t: T) => boolean): It<T> {
    return new It(() => {
      const iter = this.iter()

      return new Iter(() => {
        for (;;) {
          const result = iter.next()

          if (result.done || f(result.value)) {
            return result
          }
        }
      })
    })
  }

  filterMap<U>(f: (t: T) => U | undefined): It<U> {
    return new It(() => {
      const iter = this.iter()

      return new Iter(() => {
        for (;;) {
          const result = iter.next()
          const map = f(result.value)

          if (result.done) {
            return result
          } else if (map !== undefined && map !== null) {
            return { done: false, value: map }
          }
        }
      })
    })
  }

  allMap<U>(f: (t: T) => U | undefined) {
    const results: (U | undefined)[] = []

    let allDefined = true

    for (const t of this) {
      const result = f(t)

      allDefined &&= result !== undefined

      results.push(result)
    }

    if (allDefined) {
      return Iter.from(results.values())
    } else {
      return Iter.empty
    }
  }

  find(f: (t: T) => boolean): T | undefined {
    for (const t of this) {
      if (f(t)) {
        return t
      }
    }

    return undefined
  }

  findMap<U>(f: (t: T) => U | undefined): U | undefined {
    for (const t of this) {
      const u = f(t)

      if (u !== undefined) {
        return u
      }
    }

    return undefined
  }
}

export class Observable<T = void> {
  constructor(public readonly listeners: ((value: T) => void)[] = []) {}

  subscribe = (listener: (value: T) => void): (() => void) => {
    this.listeners.push(listener)

    return () => this.listeners.splice(this.listeners.indexOf(listener), 1)
  }

  trigger(value: T) {
    for (const listener of this.listeners) {
      listener(value)
    }
  }
}

export class Entity {
  static readonly null = new Entity(Number.MAX_SAFE_INTEGER)

  constructor(public readonly id: number) {}

  static parse(id: string) {
    return new Entity(parseInt(id))
  }
}

export class Entry<C> {
  constructor(
    public readonly entity: Entity,
    public readonly component: C,
  ) {}
}

export class Index {
  constructor(private readonly index: number[] = []) {}

  get(entity: Entity): number {
    return this.index[entity.id]
  }

  set(entity: Entity, index: number) {
    this.index[entity.id] = index
  }

  remove(entity: Entity) {
    delete this.index[entity.id]
  }
}

export class Handle<T> {
  constructor(private readonly data: T) {}

  get(): T {
    return this.data
  }
}

export class Pool<C> {
  constructor(
    private readonly entities: Entity[] = [],
    private readonly components: C[] = [],
    private readonly index: Index = new Index(),
    private readonly observable: Observable = new Observable(),
    private entitiesIt: It<Entity> = It.from(entities),
    private componentsIt: It<C> = It.from(components),
    private entriesIt: It<Entry<C>> = new It(() => this.entities.entries()).map(
      ([index, entity]) => new Entry(entity, components[index]),
    ),
  ) {}

  get length(): number {
    return this.entities.length
  }

  get entries(): It<Entry<C>> {
    return this.entriesIt
  }

  [Symbol.iterator](): IterableIterator<Entity> {
    return this.entities[Symbol.iterator]()
  }

  has(entity: Entity): boolean {
    const index = this.index.get(entity)

    return index !== undefined && entity.id === this.entities[index].id
  }

  get(entity: Entity): C | undefined {
    const index = this.index.get(entity)

    return index !== undefined && entity.id === this.entities[index].id
      ? this.components[index]
      : undefined
  }

  set(entity: Entity, value: C): C | undefined {
    const index = this.index.get(entity)

    if (index !== undefined) {
      if (entity === this.entities[index]) {
        const current = this.components[index]

        this.components[index] = value
        this.componentsIt = It.from(this.components)
        this.entriesIt = new It(() => this.entities.entries()).map(
          ([index, entity]) => new Entry(entity, this.components[index]),
        )
        this.observable.trigger()

        return current
      }

      this.entities[index] = entity
      this.components[index] = value
    } else {
      this.index.set(entity, this.length)
      this.entities.push(entity)
      this.components.push(value)
    }

    this.entitiesIt = It.from(this.entities)
    this.componentsIt = It.from(this.components)
    this.entriesIt = new It(() => this.entities.entries()).map(
      ([index, entity]) => new Entry(entity, this.components[index]),
    )
    this.observable.trigger()

    return undefined
  }

  remove(entity: Entity): C | undefined {
    const index = this.index.get(entity)

    if (index === undefined || entity !== this.entities[index]) {
      return undefined
    }

    this.index.remove(entity)

    const swapEntity = this.entities.pop()!
    const swapComponent = this.components.pop()!

    if (index !== this.length) {
      const current = this.components[index]

      this.index.set(swapEntity, index)
      this.entities[index] = swapEntity
      this.components[index] = swapComponent

      this.entitiesIt = It.from(this.entities)
      this.componentsIt = It.from(this.components)
      this.entriesIt = new It(() => this.entities.entries()).map(
        ([index, entity]) => new Entry(entity, this.components[index]),
      )
      this.observable.trigger()

      return current
    }

    this.entitiesIt = It.from(this.entities)
    this.componentsIt = It.from(this.components)
    this.entriesIt = new It(() => this.entities.entries()).map(
      ([index, entity]) => new Entry(entity, this.components[index]),
    )
    this.observable.trigger()

    return swapComponent
  }

  getEntities = (): It<Entity> => {
    return this.entitiesIt
  }

  getComponents = (): It<C> => {
    return this.componentsIt
  }

  getEntries = (): It<Entry<C>> => {
    return this.entriesIt
  }

  useEntities = (): It<Entity> => {
    return useSyncExternalStore(this.observable.subscribe, this.getEntities)
  }

  useComponent = (entity: Entity): C | undefined => {
    return useSyncExternalStore(this.observable.subscribe, () => this.get(entity))
  }

  useComponents = (): It<C> => {
    return useSyncExternalStore(this.observable.subscribe, this.getComponents)
  }

  useEntries = (): It<Entry<C>> => {
    return useSyncExternalStore(this.observable.subscribe, this.getEntries)
  }
}

export type Type = abstract new (...args: never) => unknown

export type Pools<T extends Type[]> = {
  [I in keyof T]: Pool<InstanceType<T[I]>>
}

export type Components<T extends Type[]> = {
  [I in keyof T]: InstanceType<T[I]>
}

export class Store {
  constructor(public readonly pools: Map<unknown, Pool<unknown>> = new Map()) {}

  create(): Entity {
    const pool = this.pool(Entity)
    const entity = new Entity(pool.length)

    pool.set(entity, entity)

    return entity
  }

  log(entity: Entity) {
    for (const pool of this.pools.values()) {
      const component = pool.get(entity)

      if (component !== undefined) {
        console.log(component)
      }
    }
  }

  system<T extends Type[]>(...types: T): System<T> {
    return new System(this, types.map((type) => this.pool(type)) as Pools<T>)
  }

  pool<T extends Type>(type: T): Pool<InstanceType<T>> {
    if (this.pools.has(type)) {
      return this.pools.get(type)! as Pool<InstanceType<T>>
    }

    const pool = new Pool<InstanceType<T>>()

    this.pools.set(type, pool)

    return pool
  }
}

export class System<T extends Type[]> {
  constructor(
    private readonly store: Store,
    private readonly pools: Pools<T>,
  ) {}

  get smallest(): Pool<unknown> {
    let smallest = undefined

    for (const pool of this.pools) {
      if (smallest === undefined || pool.length < smallest.length) {
        smallest = pool
      }
    }

    return smallest!
  }

  [Symbol.iterator](): Iterable<Components<T>> {
    return It.from(this.smallest).map((entity) => this.get(entity)!)
  }

  create(...components: Components<T>): Entity {
    const entity = this.store.create()

    this.set(entity, ...components)

    return entity
  }

  has(entity: Entity): boolean {
    return !this.pools.some((pool) => !pool.has(entity))
  }

  get(entity: Entity): Components<T> | undefined {
    return It.from(this.pools).allMap((pool) => pool.get(entity)) as Components<T> | undefined
  }

  set(entity: Entity, ...components: Components<T>): Components<T> | undefined {
    return It.from(this.pools.entries()).allMap(([i, pool]) => pool.set(entity, components[i])) as
      | Components<T>
      | undefined
  }
}

// export function useSystem<T extends Type[]>(system: System<T>) {
//   return useSyncExternalStore(system.subscribe, system.getSnapshot)
// }

// export function useEntity<T extends Type[]>(
//   system: System<T>,
//   entity: Entity,
// ): Components<T> | undefined {
//   return useSyncExternalStore(system.subscribe, () => system.getEntitySnapshot(entity))
// }

export interface TableFactory<A extends unknown[], V extends TableRow> {
  new (...args: A): V
}

export interface TableRow {
  id: string
}

export class Table<A extends unknown[], V extends TableRow> {
  constructor(
    private factory: TableFactory<A, V>,
    private data: Record<string, V> = {},
  ) {}

  add(...args: A): Table<A, V> {
    const value = new this.factory(...args)

    this.data[value.id] = value

    return this
  }

  get(id: string): V {
    return this.data[id]
  }

  ids(): string[] {
    return Object.keys(this.data)
  }

  values(): V[] {
    return Object.values(this.data)
  }

  entries(): [string, V][] {
    return Object.entries(this.data)
  }
}

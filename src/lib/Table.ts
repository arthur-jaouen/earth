export function createTable<T extends { id: string }>(entries: T[]): Record<string, T> {
  return Object.fromEntries(entries.map((e) => [e.id, e]));
}

export function cls(...names: (string | null | undefined | false)[]): string {
  return names.filter((name) => name).join(' ');
}

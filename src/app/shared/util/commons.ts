export function handleNullArray<T>(array: T[]): T[] {
  return array || [];
}

export function stringCompare(a: string, b: string): number {
  if (a && b) {
    return a.localeCompare(b);
  }

  if (a && !b) {
    return -1;
  }

  if (!a && b) {
    return 1;
  }

  return 0;
}

export function clone<T extends object>(object: T): T {
  return object ? JSON.parse(JSON.stringify(object)) : object;
}

export function localeCompare(a: string, b: string): number {
  if(a && b) {
    return a.localeCompare(b);
  }

  if(a && !b) {
    return -1;
  }

  if(!a && b) {
    return 1;
  }

  return 0;
}

export function hasAny(arr: any[]) {
  return Array.isArray(arr) && arr.length > 0;
}

export function isEmpty(arr: any[]) {
  return Array.isArray(arr) && arr.length === 0;
}

export function getFirstProperty(data: Record<string, unknown>): unknown {
  const key = Object.keys(data)[0];
  return data[key];
}

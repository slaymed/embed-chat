export function toBoolean<T extends boolean | null>(
  value: any,
  replace: T = null as T,
): boolean | T {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    if (value === 'true') return true;
    if (value === 'false') return false;
  }
  return replace;
}

export function toNumber<T extends number | null>(
  value: any,
  replace: T = null as T,
): number | T {
  if (typeof value === 'number') {
    if (isNaN(value)) return replace;
    if (!isFinite(value)) return replace;

    return value;
  }
  if (typeof value === 'string') {
    value = parseFloat(value);

    if (isNaN(value)) return replace;
    if (!isFinite(value)) return replace;

    return value;
  }
  return replace;
}

export function toWebsiteDomain(value: string): string {
  if (typeof value !== 'string') {
    return value;
  }
  return value
    .replaceAll('http://', '')
    .replaceAll('https://', '')
    .replaceAll('www.', '')
    .toLowerCase();
}

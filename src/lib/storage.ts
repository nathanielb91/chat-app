export function setLocalStorage(key: string, value: unknown): void {
  const storedValue = typeof value === "string" ? value : JSON.stringify(value);
  window.localStorage.setItem(key, storedValue);
}

export function removeLocalStorage(key: string): void {
  window.localStorage.removeItem(key);
}

export function getLocalStorage<T = string>(key: string): T | null {
  const val = window.localStorage.getItem(key);
  if (!val) return null;

  try {
    return JSON.parse(val) as T;
  } catch {
    return val as T;
  }
}

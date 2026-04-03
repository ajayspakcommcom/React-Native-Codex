import type { MMKV } from 'react-native-mmkv'

export function readBoolean(
  storage: MMKV,
  key: string,
  fallbackValue: boolean,
): boolean {
  const value = storage.getBoolean(key)
  return typeof value === 'boolean' ? value : fallbackValue
}

export function readNumber(
  storage: MMKV,
  key: string,
  fallbackValue: number,
): number {
  const value = storage.getNumber(key)
  return typeof value === 'number' ? value : fallbackValue
}

export function readObject<T extends object>(
  storage: MMKV,
  key: string,
  fallbackValue: T,
): T {
  const rawValue = storage.getString(key)

  if (!rawValue) {
    return fallbackValue
  }

  try {
    const parsedValue = JSON.parse(rawValue) as Partial<T>
    return {
      ...fallbackValue,
      ...parsedValue,
    }
  } catch {
    return fallbackValue
  }
}

export function removeKeys(storage: MMKV, keys: readonly string[]): void {
  keys.forEach(key => {
    storage.remove(key)
  })
}

export function writeObject<T extends object>(
  storage: MMKV,
  key: string,
  value: T,
): void {
  storage.set(key, JSON.stringify(value))
}

import { Signal, createSignal } from "solid-js";

// https://stackoverflow.com/questions/70030144/how-to-update-local-storage-values-in-solidjs-using-hooks
export default function createStoredSignal<T>(
  key: string,
  defaultValue: T,
  storage = localStorage,
): Signal<T> {
  const initialValue = storage.getItem(key)
    ? (JSON.parse(storage.getItem(key) || "") as T)
    : defaultValue;

  const [value, setValue] = createSignal<T>(initialValue);

  const setValueAndStore = ((arg) => {
    const v = setValue(arg);
    storage.setItem(key, JSON.stringify(v));
    return v;
  }) as typeof setValue;

  return [value, setValueAndStore];
}

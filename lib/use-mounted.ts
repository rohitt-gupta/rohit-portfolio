"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * `true` once the client has hydrated, `false` during SSR and the first render.
 *
 * Use this instead of the `useState(false)` + `useEffect(() => setMounted(true))`
 * pattern — it reads the same on screen without a second render pass.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

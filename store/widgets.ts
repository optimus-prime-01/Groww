import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { nanoid } from "nanoid"

export type Widget = {
  id: string
  name: string
  apiUrl: string
  refreshInterval: number
  mode: "card" | "table" | "chart"
  fields: string[]
}

type State = {
  widgets: Widget[]
  add: (w: Omit<Widget, "id">) => void
  update: (id: string, w: Omit<Widget, "id">) => void
  remove: (id: string) => void
}

export const useWidgetsStore = create<State>()(
  persist(
    (set) => ({
      widgets: [],
      add: (w) =>
        set((s) => ({
          widgets: [{ id: nanoid(), ...w }, ...s.widgets],
        })),
      update: (id, w) =>
        set((s) => ({
          widgets: s.widgets.map((x) => (x.id === id ? { ...x, ...w } : x)),
        })),
      remove: (id) =>
        set((s) => ({
          widgets: s.widgets.filter((x) => x.id !== id),
        })),
    }),
    { name: "fd-widgets", storage: createJSONStorage(() => localStorage) },
  ),
)

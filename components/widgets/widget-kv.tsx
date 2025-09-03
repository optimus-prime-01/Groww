"use client"

import { getByPath } from "@/lib/json-utils"

export function CardWidget({ data, fields }: { data: any; fields: string[] }) {
  const items = (fields || []).map((p) => {
    const value = getByPath(data, p)
    return { label: p.split(".").slice(-1)[0], value }
  })
  return (
    <div className="rounded-lg border bg-slate-950/40">
      <div className="divide-y divide-white/5">
        {items.map((it) => (
          <div key={it.label} className="grid grid-cols-1 sm:grid-cols-3 items-start sm:items-center px-3 sm:px-4 py-2 sm:py-3 gap-1 sm:gap-2">
            <span className="text-xs text-slate-400 truncate font-medium">{it.label}</span>
            <div className="col-span-1 sm:col-span-2 text-left sm:text-right font-medium text-slate-100 truncate text-sm sm:text-base" title={String(it.value ?? "—")}>
              {String(it.value ?? "—")}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

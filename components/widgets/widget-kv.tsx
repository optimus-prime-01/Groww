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
          <div key={it.label} className="grid grid-cols-3 items-center px-4 py-3 gap-2">
            <span className="text-xs text-slate-400 truncate">{it.label}</span>
            <div className="col-span-2 text-right font-medium text-slate-100 truncate" title={String(it.value ?? "—")}>
              {String(it.value ?? "—")}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

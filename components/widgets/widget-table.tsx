"use client"

import * as React from "react"
import { getByPath } from "@/lib/json-utils"
import { Input } from "@/components/ui/input"

export function TableWidget({ data, fieldPath }: { data: any; fieldPath?: string }) {
  const rows = Array.isArray(getByPath(data, fieldPath || "")) ? getByPath(data, fieldPath || "") : []
  const [q, setQ] = React.useState("")
  const filtered = React.useMemo(() => {
    if (!q) return rows
    const k = q.toLowerCase()
    return rows.filter((r: any) => JSON.stringify(r).toLowerCase().includes(k))
  }, [rows, q])
  const columns = rows[0] ? Object.keys(rows[0]) : []
  return (
    <div className="space-y-3">
      <Input placeholder="Search table..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-max text-sm">
          <thead className="bg-slate-900/70">
            <tr>
              {columns.map((c) => (
                <th key={c} className="px-3 py-2 text-left font-medium text-slate-300">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((r: any, i: number) => (
              <tr key={i} className="hover:bg-slate-900/40">
                {columns.map((c) => (
                  <td key={c} className="px-3 py-2 text-slate-200">
                    {String(r[c])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

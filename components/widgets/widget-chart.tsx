"use client"

import { getByPath } from "@/lib/json-utils"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function ChartWidget({ data, fieldPath }: { data: any; fieldPath?: string }) {
  const series = Array.isArray(getByPath(data, fieldPath || "")) ? getByPath(data, fieldPath || "") : []
  const key = series[0] ? Object.keys(series[0]).find((k) => typeof series[0][k] === "number") : undefined
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series}>
          <XAxis dataKey={(d: any, i: number) => i} hide />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey={key as any} stroke="#10b981" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

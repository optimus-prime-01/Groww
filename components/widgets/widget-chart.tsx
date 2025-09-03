"use client"

import { getByPath } from "@/lib/json-utils"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"

export function ChartWidget({ data, fieldPath }: { data: any; fieldPath?: string }) {
  const rawData = getByPath(data, fieldPath || "")
  const series = Array.isArray(rawData) ? rawData : []
  
  // Find numeric keys for charting
  const numericKeys = series.length > 0 ? Object.keys(series[0]).filter(k => typeof series[0][k] === "number") : []
  const primaryKey = numericKeys[0]
  
  // If no data, show placeholder
  if (series.length === 0 || !primaryKey) {
    return (
      <div className="h-56 w-full flex items-center justify-center bg-slate-950/40 rounded-lg border">
        <div className="text-center text-slate-400">
          <div className="text-sm">No chart data available</div>
          <div className="text-xs mt-1">
            {series.length === 0 ? "No data found" : "Select a field with numeric data"}
          </div>
          {fieldPath && (
            <div className="text-xs mt-1 text-slate-500">
              Field: {fieldPath}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-56 w-full bg-slate-950/40 rounded-lg border p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey={(d: any, i: number) => i} 
            stroke="#6b7280"
            fontSize={12}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={12}
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#f3f4f6'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={primaryKey} 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
            activeDot={{ r: 5, fill: '#10b981' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

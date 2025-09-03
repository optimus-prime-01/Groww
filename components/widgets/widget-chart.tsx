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
    <div className="h-48 sm:h-56 w-full bg-slate-950/40 rounded-lg border p-1 sm:p-2 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey={(d: any, i: number) => i} 
            stroke="#6b7280"
            fontSize={10}
            tick={{ fill: '#9ca3af' }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke="#6b7280"
            fontSize={10}
            tick={{ fill: '#9ca3af' }}
            width={40}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              color: '#f3f4f6',
              fontSize: '12px'
            }}
            labelStyle={{ fontSize: '11px' }}
          />
          <Line 
            type="monotone" 
            dataKey={primaryKey} 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', strokeWidth: 2, r: 2 }}
            activeDot={{ r: 4, fill: '#10b981' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

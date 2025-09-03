"use client"

import * as React from "react"
import useSWR from "swr"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RotateCw, Settings2, Trash2 } from "lucide-react"
import { useWidgetsStore, type Widget } from "@/store/widgets"
import { AddWidgetDialog } from "./add-widget-dialog"
import { TableWidget } from "./widget-table"
import { CardWidget } from "./widget-kv"
import { ChartWidget } from "./widget-chart"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function WidgetCard({ widget }: { widget: Widget }) {
  const remove = useWidgetsStore((s) => s.remove)
  const { data, mutate, isValidating } = useSWR(widget.apiUrl, fetcher, {
    refreshInterval: widget.refreshInterval * 1000,
    revalidateOnFocus: false,
  })
  const [opened, setOpened] = React.useState(false)
  const updatedAt = React.useMemo(() => {
    const d = new Date()
    return `${d.toLocaleTimeString([], { hour12: false })}`
  }, [data])

  return (
    <Card className="bg-slate-900/60 ring-1 ring-white/10 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-shadow duration-300">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-3">
          <CardTitle className="text-base text-white">{widget.name}</CardTitle>
          <Badge variant="outline" className="text-xs">
            {widget.refreshInterval}s
          </Badge>
        </div>
        <div className="flex items-center gap-1.5">
          <Button size="icon" variant="ghost" onClick={() => mutate()} aria-label="Refresh">
            <RotateCw className={`h-4 w-4 ${isValidating ? "animate-spin" : ""}`} />
          </Button>
          <AddWidgetDialog open={opened} onOpenChange={setOpened} preset={widget}>
            <Button size="icon" variant="ghost" aria-label="Edit">
              <Settings2 className="h-4 w-4" />
            </Button>
          </AddWidgetDialog>
          <Button size="icon" variant="ghost" onClick={() => remove(widget.id)} aria-label="Delete">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 overflow-hidden">
        {widget.mode === "table" ? (
          <TableWidget data={data} fieldPath={widget.fields[0]} />
        ) : widget.mode === "chart" ? (
          <ChartWidget data={data} fieldPath={widget.fields[0]} />
        ) : (
          <CardWidget data={data} fields={widget.fields} />
        )}
        <p className="text-center text-[11px] text-slate-500">Last updated: {updatedAt}</p>
      </CardContent>
    </Card>
  )
}

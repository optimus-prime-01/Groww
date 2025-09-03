"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Plus, BarChart2 } from "lucide-react"
import { useWidgetsStore } from "@/store/widgets"
import { WidgetCard } from "./widgets/widget-card"
import { AddWidgetDialog } from "./widgets/add-widget-dialog"

export function WidgetsView() {
  const widgets = useWidgetsStore((s) => s.widgets)
  const [open, setOpen] = React.useState(false)
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between rounded-xl bg-slate-900/60 px-4 py-4 ring-1 ring-white/10 shadow-lg shadow-emerald-500/20">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30">
            <BarChart2 className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold leading-6 text-white text-balance">Finance Dashboard</h1>
            <p className="text-xs text-slate-400">{widgets.length} active widget • Real-time data</p>
          </div>
        </div>
        <AddWidgetDialog open={open} onOpenChange={setOpen}>
          <Button className="bg-emerald-600 hover:bg-emerald-500">
            <Plus className="mr-2 h-4 w-4" />
            Add Widget
          </Button>
        </AddWidgetDialog>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 max-w-full">
        {widgets.map((w) => (
          <WidgetCard key={w.id} widget={w} />
        ))}
        <div className="rounded-xl border-2 border-dashed border-emerald-600/40 bg-slate-900/40 p-6 ring-1 ring-white/10 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-shadow duration-300">
          <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/20 text-emerald-400 ring-1 ring-emerald-500/30">
              <Plus className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-white">Add Widget</p>
              <p className="text-xs text-slate-400">Connect to a finance API and create a custom widget</p>
            </div>
            <AddWidgetDialog>
              <Button
                variant="outline"
                className="border-emerald-700/40 bg-slate-900/60 text-emerald-400 hover:bg-slate-800"
              >
                Add
              </Button>
            </AddWidgetDialog>
          </div>
        </div>
      </div>
    </div>
  )
}

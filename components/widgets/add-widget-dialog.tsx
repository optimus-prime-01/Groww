"use client"

import * as React from "react"
import useSWR from "swr"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/hooks/use-toast"
import { flattenJson } from "@/lib/json-utils"
import { useWidgetsStore, type Widget } from "@/store/widgets"
import { XCircleIcon } from "lucide-react"

type Props = {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (v: boolean) => void
  preset?: Widget
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function AddWidgetDialog({ children, open, onOpenChange, preset }: Props) {
  const [name, setName] = React.useState(preset?.name ?? "")
  const [apiUrl, setApiUrl] = React.useState(preset?.apiUrl ?? "")
  const [interval, setInterval] = React.useState(String(preset?.refreshInterval ?? 30))
  const [mode, setMode] = React.useState<Widget["mode"]>(preset?.mode ?? "card")
  const [selected, setSelected] = React.useState<string[]>(preset?.fields ?? [])
  const [showArraysOnly, setShowArraysOnly] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const { data, error, isValidating, mutate } = useSWR(apiUrl && apiUrl.startsWith("http") ? apiUrl : null, fetcher, {
    revalidateOnFocus: false,
  })
  const add = useWidgetsStore((s) => s.add)
  const update = useWidgetsStore((s) => s.update)
  const [internalOpen, setInternalOpen] = React.useState(false)
  const controlled = typeof open === "boolean"
  const isOpen = controlled ? open : internalOpen
  const setOpen = controlled && onOpenChange ? onOpenChange : setInternalOpen

  const fields = React.useMemo(() => {
    if (!data) return []
    const list = flattenJson(data).filter((f) => (showArraysOnly ? f.type === "array" : true))
    const q = query.trim().toLowerCase()
    return q ? list.filter((f) => f.path.toLowerCase().includes(q)) : list
  }, [data, query, showArraysOnly])

  function onTest() {
    if (!apiUrl) return
    mutate()
  }

  function onToggle(path: string) {
    setSelected((prev) => (prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]))
  }

  function onRemove(path: string) {
    setSelected((prev) => prev.filter((p) => p !== path))
  }

  function onSubmit() {
    if (!name || !apiUrl || !interval) {
      toast({ title: "Missing fields", description: "Enter name, URL, and refresh interval." })
      return
    }
    const refreshInterval = Math.max(5, Number(interval) || 30)
    const base = { name, apiUrl, refreshInterval, mode, fields: selected }
    if (preset) {
      update(preset.id, base)
    } else {
      add(base)
    }
    setOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children ?? <Button>Add Widget</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Widget</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="w-name">Widget Name</Label>
            <Input
              id="w-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Bitcoin Price Tracker"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="w-url">API URL</Label>
              <Button size="sm" variant="secondary" onClick={onTest}>
                Test
              </Button>
            </div>
            <Input
              id="w-url"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.coinbase.com/v2/exchange-rates?currency=BTC"
            />
            {!!data && <Badge variant="secondary">API connection successful</Badge>}
            {error && <Badge variant="destructive">API error</Badge>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="w-int">Refresh Interval (seconds)</Label>
            <Input id="w-int" value={interval} onChange={(e) => setInterval(e.target.value)} inputMode="numeric" />
          </div>

          <div className="space-y-2">
            <Label>Select Fields to Display</Label>
            <RadioGroup className="grid grid-cols-3 gap-2" value={mode} onValueChange={(v) => setMode(v as any)}>
              <div className="flex items-center space-x-2 rounded-md border bg-slate-900/50 px-3 py-2">
                <RadioGroupItem id="m-card" value="card" />
                <Label htmlFor="m-card" className="cursor-pointer">
                  Card
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border bg-slate-900/50 px-3 py-2">
                <RadioGroupItem id="m-table" value="table" />
                <Label htmlFor="m-table" className="cursor-pointer">
                  Table
                </Label>
              </div>
              <div className="flex items-center space-x-2 rounded-md border bg-slate-900/50 px-3 py-2">
                <RadioGroupItem id="m-chart" value="chart" />
                <Label htmlFor="m-chart" className="cursor-pointer">
                  Chart
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Input placeholder="Search for fields..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <label className="flex items-center gap-2 text-xs text-slate-400">
              <input type="checkbox" checked={showArraysOnly} onChange={(e) => setShowArraysOnly(e.target.checked)} />
              Show arrays only (for table view)
            </label>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className="max-h-56 overflow-auto rounded-md border bg-slate-950/40 p-2">
                {!data && <p className="px-1 text-sm text-slate-400">Run Test to load fields</p>}
                {data &&
                  fields.map((f) => (
                    <button
                      key={f.path}
                      onClick={() => onToggle(f.path)}
                      className={`group flex w-full items-center justify-between rounded px-2 py-1.5 text-left text-sm ${selected.includes(f.path) ? "bg-emerald-600/20 text-emerald-300" : "hover:bg-slate-800/60 text-slate-300"}`}
                    >
                      <span className="truncate">{f.path}</span>
                      <Badge variant="outline" className="ml-2 text-xxs">
                        {f.type}
                      </Badge>
                    </button>
                  ))}
              </div>
              <div className="max-h-56 overflow-auto rounded-md border bg-slate-950/40 p-2">
                {selected.length === 0 && <p className="px-1 text-sm text-slate-400">Selected fields</p>}
                <div className="flex flex-wrap gap-2">
                  {selected.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-200"
                    >
                      {s}
                      <button
                        aria-label="remove"
                        onClick={() => onRemove(s)}
                        className="text-slate-400 hover:text-slate-200"
                      >
                        <XCircleIcon className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} className="bg-emerald-600 hover:bg-emerald-500">
            {preset ? "Save" : "Add Widget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

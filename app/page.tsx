"use client"

import { WidgetsView } from "@/components/widgets-view"

export default function Page() {
  return (
    <main className="min-h-dvh bg-[radial-gradient(1200px_800px_at_20%_-10%,rgba(30,41,59,.5),transparent),radial-gradient(1200px_800px_at_80%_120%,rgba(30,41,59,.5),transparent)] bg-background">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <WidgetsView />
      </div>
    </main>
  )
}

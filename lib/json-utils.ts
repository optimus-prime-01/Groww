export function flattenJson(
  input: any,
  prefix = "",
): { path: string; type: "string" | "number" | "boolean" | "array" | "object" | "null" }[] {
  const out: { path: string; type: any }[] = []
  function walk(value: any, p: string) {
    if (value === null) {
      out.push({ path: p, type: "null" })
      return
    }
    if (Array.isArray(value)) {
      out.push({ path: p, type: "array" })
      if (value.length && typeof value[0] === "object") {
        const first = value[0]
        Object.keys(first).forEach((k) => walk(first[k], `${p}.${k}`))
      }
      return
    }
    const t = typeof value
    if (t === "object") {
      Object.keys(value).forEach((k) => walk(value[k], p ? `${p}.${k}` : k))
      return
    }
    out.push({ path: p, type: t as any })
  }
  walk(input, prefix)
  return Array.from(new Map(out.map((i) => [i.path, i])).values())
}

export function getByPath(obj: any, path: string) {
  if (!obj || !path) return undefined
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

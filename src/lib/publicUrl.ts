export function publicUrl(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

/** Vite `--base=./` is for relocatable assets, not a React Router prefix. */
export function routerBasename(
  baseUrl = import.meta.env.BASE_URL,
): string | undefined {
  const trimmed = baseUrl.replace(/\/$/, '')
  if (trimmed === '' || trimmed === '.') return undefined
  return trimmed
}

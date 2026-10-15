import { useCallback, useEffect, useState } from 'react'
import { publicUrl } from './publicUrl.ts'

export type CatalogFile = {
  path: string
  role: string
}

export type Catalog = {
  name: string
  servedFrom: string
  files: CatalogFile[]
}

export type CatalogState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; catalog: Catalog }

function isCatalog(value: unknown): value is Catalog {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  if (typeof record.name !== 'string' || typeof record.servedFrom !== 'string') {
    return false
  }
  if (!Array.isArray(record.files)) return false
  return record.files.every((file) => {
    if (!file || typeof file !== 'object') return false
    const item = file as Record<string, unknown>
    return typeof item.path === 'string' && typeof item.role === 'string'
  })
}

export function useCatalog() {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState<CatalogState>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setState({ status: 'loading' })
      try {
        const response = await fetch(publicUrl('catalog.json'), {
          signal: controller.signal,
        })
        if (!response.ok) {
          throw new Error(`Catalog request failed (${response.status}).`)
        }
        const payload: unknown = await response.json()
        if (!isCatalog(payload)) {
          throw new Error(
            'catalog.json did not include a name, servedFrom, and a files list.',
          )
        }
        setState({ status: 'ready', catalog: payload })
      } catch (error) {
        if (controller.signal.aborted) return
        const message =
          error instanceof SyntaxError
            ? 'catalog.json was not valid JSON.'
            : error instanceof Error
              ? error.message
              : 'The catalog request failed.'
        setState({ status: 'error', message })
      }
    }

    void load()
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setAttempt((current) => current + 1)
  }, [])

  return { state, retry }
}
